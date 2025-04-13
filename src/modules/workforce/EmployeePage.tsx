import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/ui/table/DataTable';
import { useCoreContext } from '@/shared/contexts/CoreContext';

import { EmployeeTableData } from '../member-management/types/views';
import { getEmployeeColumns } from '../member-management/utils/columns';
import { EmployeeDialog } from './components/EmployeeDialog';
import { fetchEmployees } from './utils/api';

export function EmployeePage() {
  const { companyId } = useCoreContext();

  const { data } = useQuery({
    queryKey: ['employees', companyId],
    queryFn: () => fetchEmployees(companyId),
    enabled: !!companyId,
  });

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
        data={data ?? []}
        //
        filterKey="name"
      />

      <EmployeeDialog
        employee={rowSelected}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
