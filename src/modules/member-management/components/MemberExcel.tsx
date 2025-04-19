import * as XLSX from 'xlsx';

const url = 'https://docs.sheetjs.com/executive.json';

export async function createExcel() {
  const raw_data = await (await fetch(url)).json();

  const prez = raw_data.filter((row) =>
    row.terms.some((term) => term.type === 'prez'),
  );

  prez.forEach(
    (row) => (row.start = row.terms.find((term) => term.type === 'prez').start),
  );

  prez.sort((l, r) => l.start.localeCompare(r.start));

  const rows = prez.map((row) => ({
    name: row.name.first + ' ' + row.name.last,
    birthday: row.bio.birthday,
  }));

  console.log(rows);

  // 엑셀 worksheet 생성
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // 엑셀 workbook 생성 및 worksheet 추가
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');

  // 엑셀 파일 다운로드
  XLSX.writeFile(workbook, 'members.xlsx');
}

export async function importExcel() {
  const url = 'https://docs.sheetjs.com/PortfolioSummary.xls';
  const file = await (await fetch(url)).arrayBuffer();

  /* 엑셀 파일 읽기 */
  const workbook = XLSX.read(file);

  /* 엑셀 worksheet 이름 확인 */
  console.log('workbook.SheetNames', workbook.SheetNames);

  /* 엑셀 worksheet raw 데이터 확인 */
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  /* row 13:16 데이터 추출 (SheetJS 12:15) */
  const rows_13_16 = raw_data.slice(12, 16);

  /* merge 된 cell의 연도 채우기 */
  let last_year = 0;
  raw_data.forEach((r) => (last_year = r[0] = r[0] != null ? r[0] : last_year));

  /* 연도 2007~2024, 금액이 0 이상인 데이터 추출 */
  const rows = raw_data.filter((r) => r[0] >= 2007 && r[0] <= 2024 && r[2] > 0);

  /* 추출한 데이터 -> 객체 생성 */
  const objects = rows.map((r) => ({ FY: r[0], FQ: r[1], total: r[8] }));

  return objects;
}

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export function parseExcel(file: File) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const binaryStr = e.target?.result;

    if (!binaryStr) {
      console.log('binaryStr is null');
      return;
    }

    const workbook = XLSX.read(binaryStr, { type: 'binary' });

    const sheetName = workbook.SheetNames[0]; // 첫 번째 시트
    console.log('sheetName', sheetName);

    const worksheet = workbook.Sheets[sheetName];
    console.log('worksheet', worksheet);

    const data = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });

    const [headers, ...rows] = data;

    console.log(headers, rows);
  };

  reader.readAsArrayBuffer(file);
}

export async function parseExcelWithLLM() {
  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    input: 'Write a one-sentence bedtime story about a unicorn.',
  });
}
