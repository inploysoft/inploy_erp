import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/ui/table/DataTable';
import { trainerColumns } from '@/modules/member-management/utils/columns';
import { fetchTrainers } from './utils/api';

export function TrainerPage() {
  const { data } = useQuery({
    queryKey: ['fetchTrainers'],
    queryFn: () => fetchTrainers(),
  });

  return (
    <>
      <DataTable columns={trainerColumns} data={data ?? []} />
    </>
  );
}
