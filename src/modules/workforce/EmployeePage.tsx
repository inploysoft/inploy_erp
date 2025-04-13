import { useEffect, useState } from 'react';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

import { DataTable } from '@/components/ui/table/DataTable';
import { useCoreContext } from '@/shared/contexts/CoreContext';
import { EmployeeTableData } from '../member-management/types/views';
import { employeeColumns } from '../member-management/utils/columns';

const client = generateClient<Schema>();

export function EmployeePage() {
  const { companyId } = useCoreContext();

  const [employeeTableData, setEmployeeTableData] = useState<
    EmployeeTableData[]
  >([]);

  useEffect(() => {
    const handler = async () => {
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

      const employeeList: EmployeeTableData[] = data.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { companyId, createdAt, ...rest } = item;

        return rest;
      });

      setEmployeeTableData(employeeList);
    };

    void handler();
  }, [companyId]);

  return (
    <DataTable
      columns={employeeColumns}
      data={employeeTableData}
      //
      filterKey="name"
    />
  );
}
