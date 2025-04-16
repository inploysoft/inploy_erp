import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DataTable } from '@/components/ui/table/DataTable';
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';
import { isMemberManagementEntity } from '@/shared/lib/utils';
import { H2 } from '@/theme/Typography';
import { MembershipDialogContent } from './MembershipDialogContent';
import { MembershipTableData } from './types/views';
import { membershipColumns } from './utils/columns';
import { formatMembershipTableData } from './utils/helpers';

export function MembershipPage() {
  const { fetchModuleInstanceQuery } = useUserBootstrap();

  const [tableData, setTableData] = useState<MembershipTableData[]>([]);

  useEffect(() => {
    if (!fetchModuleInstanceQuery.data) {
      return;
    }

    if (
      isMemberManagementEntity(
        fetchModuleInstanceQuery.data?.memberManagement,
        'memberManagement',
      )
    ) {
      const result = formatMembershipTableData(
        fetchModuleInstanceQuery.data.memberManagement.membershipIds,
      );

      setTableData(result);
    }
  }, [fetchModuleInstanceQuery.data]);

  return (
    <>
      <div className="flex flex-col gap-4 py-1 md:gap-6 md:py-2">
        <div className="flex items-center justify-between">
          <H2>이용권 관리</H2>

          <Dialog>
            <DialogTrigger asChild={true}>
              <Button>이용권 등록</Button>
            </DialogTrigger>

            <MembershipDialogContent />
          </Dialog>
        </div>
      </div>

      <DataTable
        columns={membershipColumns}
        data={tableData}
        filterKey="displayName"
      />
    </>
  );
}
