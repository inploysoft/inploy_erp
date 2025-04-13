import { useEffect } from 'react';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

import { DataTable } from '@/components/ui/table/DataTable';
import { useCoreContext } from '@/shared/contexts/CoreContext';
import { memberColumns } from '../member-management/utils/columns';

const client = generateClient<Schema>();

export function EmployeePage() {
  const { memberTableData, companyId } = useCoreContext();

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

      console.log(data);
    };

    void handler();
  }, [companyId]);

  return (
    <DataTable
      columns={memberColumns}
      data={memberTableData}
      //
      filterKey="name"
    />
  );
}
