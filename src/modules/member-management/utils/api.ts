import { Schema } from 'amplify/data/resource';
import { generateClient } from 'aws-amplify/api';

import { z } from 'zod';

import { awsLogger } from '@/shared/lib/config';
import { membershipRegistrationFormSchema } from '../components/MembershipRegistrationDialog';
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

export async function createMembershipType(
  moduleInstanceId: string,
  displayName: string,
  description?: string,
): Promise<Schema['MembershipType']['type'] | undefined> {
  try {
    const { data, errors } = await client.models.MembershipType.create(
      {
        moduleInstanceId: moduleInstanceId,
        displayName: displayName,
        description: description,
      },
      {
        authMode: 'userPool',
      },
    );

    if (errors && errors.length > 0) {
      awsLogger.error('GraphQL errors: ', errors);
      throw new Error('createMembershipType: ' + errors);
    }

    if (!data) {
      return;
    }

    return data;
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('createMembershipType: ' + error);
  }
}

export async function createMembershipPlan(
  moduleInstanceId: string,
  membershipTypeId: string,
  planData: Omit<
    z.infer<typeof membershipRegistrationFormSchema>,
    'displayName' | 'description'
  >,
): Promise<Schema['MembershipPlan']['type'] | undefined> {
  try {
    const { data, errors } = await client.models.MembershipPlan.create(
      {
        moduleInstanceId: moduleInstanceId,
        membershipTypeId: membershipTypeId,
        ...planData,
      },
      {
        authMode: 'userPool',
      },
    );

    if (errors && errors.length > 0) {
      awsLogger.error('GraphQL errors: ', errors);
      throw new Error('createMembershipPlan: ' + errors);
    }

    if (!data) {
      return;
    }

    return data;
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('createMembershipPlan: ' + error);
  }
}
