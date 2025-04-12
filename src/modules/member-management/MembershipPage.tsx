import { DataTable } from '@/components/inploy/table/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useCoreContext } from '@/contexts/CoreContext';
import { H2 } from '@/theme/Typography';
import { membershipColumns } from './columns';
import { MembershipDialogContent } from './MembershipDialogContent';

export function MembershipPage() {
  const { membershipTableData } = useCoreContext();

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
        data={membershipTableData}
        filterKey="displayName"
      />
    </>
  );
}
