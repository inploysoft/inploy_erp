import { Schema } from 'amplify/data/resource';
import { generateClient } from 'aws-amplify/api';

import { z } from 'zod';

import { awsLogger } from '@/shared/lib/config';
import { memberExcelSchema2D } from '../types/api';

const client = generateClient<Schema>();

export async function llmParsedMembershipsFromExcel(
  membershipCell: string[],
): Promise<z.infer<typeof memberExcelSchema2D> | undefined> {
  try {
    const { data, errors } = await client.queries.parseComplexField(
      {
        complexFields: membershipCell,
      },
      { authMode: 'userPool' },
    );

    if (errors && errors.length > 0) {
      awsLogger.error('GraphQL errors: ' + errors);
      throw new Error('llmParsedMembershipsFromExcel: ' + errors);
    }

    if (!data || data.length === 0) {
      awsLogger.error('No data: ' + errors);
      return;
    }

    const parsed: z.infer<typeof memberExcelSchema2D> = (data as string[]).map(
      (str) => JSON.parse(str),
    );

    const {
      success,
      data: validatedData,
      error,
    } = memberExcelSchema2D.safeParse(parsed);

    if (!success) {
      // TODO: 20250422 이용권 파싱 실패. 에러 alert 필요 / 에러시 llm 다시 호출 여부 고민
      awsLogger.error('Validation failed: ' + error);
      return;
    }

    return validatedData;
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('llmParsedMembershipsFromExcel: ' + error);
  }
}
