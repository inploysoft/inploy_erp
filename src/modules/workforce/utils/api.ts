import { generateClient } from 'aws-amplify/data';
import { ConsoleLogger } from 'aws-amplify/utils';
import type { Schema } from '../../../../amplify/data/resource';

import { z } from 'zod';

import { UpdateData } from '@/modules/member-management/types/api';
import { EmployeeTableData } from '@/modules/workforce/types/api';
import { formatInternationalPhoneToKorean } from '@/shared/lib/format';
import { WorkforceEntity } from '@/shared/types/api';
import { formSchema } from '../components/EmployeeDialog';

const client = generateClient<Schema>();

const logger = new ConsoleLogger('API');

export async function fetchEmployees(
  companyId: string,
): Promise<EmployeeTableData[] | undefined> {
  const { data, errors } = await client.models.CompanyMember.list({
    authMode: 'userPool',
    filter: {
      companyId: {
        eq: companyId,
      },
    },
  });

  if (errors) {
    console.log('FetchEmployeeError: ', errors);
    return;
  }

  const result: EmployeeTableData[] = data.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { companyId, createdAt, phone, ...rest } = item;

    return {
      ...rest,
      phone: formatInternationalPhoneToKorean(phone),
    };
  });

  return result;
}

export async function updateEmployee(
  employee: UpdateData<EmployeeTableData>,
): Promise<Schema['CompanyMember']['type'] | undefined> {
  const { data, errors } = await client.models.CompanyMember.update(employee, {
    authMode: 'userPool',
  });

  if (errors) {
    console.error(errors);

    return;
  }

  if (!data) {
    return;
  }

  return data;
}

/**
 * 트레이너 생성
 * @param sub
 * @param workforceModule
 * @param employee
 * @returns 트레이너 생성 결과
 */
export async function createTrainer(
  sub: string,
  workforceModule: WorkforceEntity | undefined,
  employee: z.infer<typeof formSchema>,
): Promise<Schema['Trainer']['type'] | undefined> {
  if (!workforceModule) {
    return;
  }

  try {
    const { data, errors } = await client.models.Trainer.create(
      {
        moduleInstanceId: workforceModule.id,
        sub: sub,
        name: employee.name,
        phone: employee.phone,
      },
      {
        authMode: 'userPool',
      },
    );

    if (errors && errors.length > 0) {
      logger.error('GraphQL errors: ', errors);
      throw new Error('createTrainer: ' + errors);
    }

    if (!data) {
      logger.error('createTrainer: ', errors);
      return;
    }

    return data;
  } catch (error) {
    logger.error('Exceptional errors: ', error);
    throw new Error('createTrainer: ' + error);
  }
}

/**
 * 트레이너 목록 조회
 * @returns 트레이너 목록
 */
export async function fetchTrainers(): Promise<
  Schema['Trainer']['type'][] | undefined
> {
  try {
    const { data, errors } = await client.models.Trainer.list({
      authMode: 'userPool',
    });

    if (errors) {
      logger.error('GraphQL errors: ', errors);
      throw new Error('fetchTrainers: ' + errors);
    }

    if (!data) {
      logger.error('fetchTrainers: ', errors);
      return;
    }

    return data.map((item) => ({
      ...item,
      phone: formatInternationalPhoneToKorean(item.phone ?? ''),
    }));
  } catch (error) {
    logger.error('Exceptional errors: ', error);
    throw new Error('fetchTrainers: ' + error);
  }
}

/**
 * 트레이너 조회
 * @param sub
 * @returns 트레이너 조회 결과
 */
export async function fetchTrainer(
  sub: string,
): Promise<Schema['Trainer']['type'] | undefined> {
  try {
    const { data, errors } = await client.models.Trainer.list({
      authMode: 'userPool',
      filter: {
        sub: {
          eq: sub,
        },
      },
    });

    if (errors) {
      logger.error('GraphQL errors: ', errors);
      throw new Error('fetchTrainer: ' + errors);
    }

    if (!data || data.length === 0) {
      logger.error('fetchTrainer: ', errors);
      return;
    }

    return data[0];
  } catch (error) {
    logger.error('Exceptional errors: ', error);
    throw new Error('fetchTrainer: ' + error);
  }
}

/**
 * 트레이너 삭제
 * @param id
 * @returns 트레이너 삭제 결과
 */
export async function deleteTrainer(
  id: string,
): Promise<Schema['Trainer']['type'] | undefined> {
  try {
    const { data, errors } = await client.models.Trainer.delete(
      {
        id: id,
      },
      {
        authMode: 'userPool',
      },
    );

    if (errors) {
      logger.error('GraphQL errors: ', errors);
      throw new Error('deleteTrainer: ' + errors);
    }

    if (!data) {
      logger.error('deleteTrainer: ', errors);
      return;
    }

    return data;
  } catch (error) {
    logger.error('Exceptional errors: ', error);
    throw new Error('deleteTrainer: ' + error);
  }
}
