import * as XLSX from 'xlsx';

import { awsLogger } from '@/shared/lib/config';
import { MemberExcelRowObject, MemberTableData2 } from '../types/views';
import { llmParsedMembershipsFromExcel } from './api';
import { formatMemberTableDataFromExcel } from './helpers';

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

interface ParseExcel {
  headers: string[];
  rows: string[][];
}

export async function parseExcel2(file: File): Promise<ParseExcel | undefined> {
  const buffer = await readFileAsArrayBuffer(file);

  const data = new Uint8Array(buffer);

  const workbook = XLSX.read(data, { type: 'array' });

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const excelData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
    header: 1,
    raw: false,
  });

  if (!excelData.length) {
    awsLogger.error('Empty sheet');
    return;
  }

  // TODO: 20250420 rows: string[][] -> 구조 변경
  const [headers, ...rows] = excelData;

  return { headers, rows };
}

const excelHeaderValue = [
  'name',
  'phone',
  'gender',
  'birthDate',
  'address',
  'lastVisitedAt',
  'FCtrainer',
  'memoAt',
  'memo',
  'memberships',
  'latestExpiredAt', // 필요없음
  'status', // 멤버십 상태...
  'PTtrainer',
] as const;

export async function transformMemberExcelToObjects({
  headers,
  rows,
}: ParseExcel): Promise<MemberTableData2[]> {
  const headerMap: Record<string, string> = Object.fromEntries(
    headers.map((key, index) => [key, excelHeaderValue[index]]),
  );

  const membershipIndex = headers.findIndex((cell) => cell === '이용권');

  const membershipTexts = rows.map((cell) => cell[membershipIndex]);

  //
  const preprocessed = membershipTexts.map((block) => {
    return block
      .split('\n')
      .map((line) => {
        const date = line.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;

        let normalizedLine = line;

        if (date) {
          normalizedLine = normalizedLine.replace(date, '___DATE___');
        }

        normalizedLine = normalizedLine
          .replace(/[-/]/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        if (date) {
          normalizedLine = normalizedLine.replace('___DATE___', date);
        }

        return normalizedLine;
      })
      .join('\n');
  });

  // TODO: 20250422 300rows로 배치 변환 로직 추가
  const memberships = await llmParsedMembershipsFromExcel(preprocessed);

  // TODO: 20250422 타입 재정의 (zod 사용)
  const excelObjectMap = rows.map((row, idx) => {
    const obj: Record<string, unknown> = {};

    for (let i = 0; i < headers.length; i++) {
      const originalKey = headers[i];
      const targetKey =
        (headerMap[originalKey] as keyof MemberExcelRowObject) ?? originalKey;

      if (i === membershipIndex) {
        obj[targetKey] = memberships?.[idx];
      } else {
        obj[targetKey] = row[i];
      }
    }

    return obj;
  });

  const result = formatMemberTableDataFromExcel(
    excelObjectMap as unknown as MemberExcelRowObject[],
  );

  return result;
}
