import { useEffect, useState } from 'react';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DataTable } from '@/components/ui/table/DataTable';
import { useCoreContext } from '@/shared/contexts/CoreContext';

import { EmployeeTableData } from '../member-management/types/views';
import { getEmployeeColumns } from '../member-management/utils/columns';

const client = generateClient<Schema>();

export function EmployeePage() {
  const { companyId } = useCoreContext();

  //
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

  //
  const [rowSelected, setRowSelected] = useState<EmployeeTableData | null>(
    null,
  );

  const handleOpenModal = (employee: EmployeeTableData) => {
    setRowSelected(employee);
  };

  const handleCloseModal = () => {
    setRowSelected(null);
  };

  const columns = getEmployeeColumns(handleOpenModal);

  return (
    <>
      <DataTable
        columns={columns}
        data={employeeTableData}
        //
        filterKey="name"
      />

      <Dialog open={!!rowSelected} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>

            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
