import { useEffect, useState } from 'react';

import { DataTable } from '@/components/ui/table/DataTable';
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';
import { H2 } from '@/theme/Typography';
import { MembershipRegistrationDialog } from './components/MembershipRegistrationDialog';
import { MembershipTableData } from './types/views';
import { membershipColumns } from './utils/columns';
import { formatMembershipTableData } from './utils/helpers';

export function MembershipPage() {
  const { memberManagementModule } = useUserBootstrap();

  const [tableData2, setTableData2] = useState<MembershipTableData[]>([]);

  useEffect(() => {
    if (!memberManagementModule) {
      return;
    }

    const result = formatMembershipTableData(memberManagementModule);

    setTableData2(result);
  }, [memberManagementModule]);

  return (
    <>
      <div className="flex flex-col gap-4 py-1 md:gap-6 md:py-2">
        <div className="flex items-center justify-between">
          <H2>이용권 관리</H2>

          <MembershipRegistrationDialog />
        </div>
      </div>

      <DataTable
        columns={membershipColumns}
        data={tableData2}
        filterKey="displayName"
      />
    </>
  );
}
