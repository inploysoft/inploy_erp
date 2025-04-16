import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';

import { UpdateData } from '@/modules/member-management/types/api';
import { EmployeeTableData } from '@/modules/member-management/types/views';
import { formatInternationalPhoneToKorean } from '@/shared/lib/format';

const client = generateClient<Schema>();

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
