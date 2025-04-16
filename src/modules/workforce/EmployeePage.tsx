import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/ui/table/DataTable';

import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';
import { EmployeeTableData } from '../member-management/types/views';
import { getEmployeeColumns } from '../member-management/utils/columns';
import { EmployeeDialog } from './components/EmployeeDialog';
import { fetchEmployees } from './utils/api';

export function EmployeePage() {
  const { fetchLoginUserQuery } = useUserBootstrap();

  const { data } = useQuery({
    queryKey: ['employees', fetchLoginUserQuery.data?.companyId],
    queryFn: () => fetchEmployees(fetchLoginUserQuery.data?.companyId ?? ''),
    enabled: !!fetchLoginUserQuery.data?.companyId,
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
