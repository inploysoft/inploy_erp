import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button/button';
import { SectionCards } from '@/components/ui/sidebar/SectionCards';
import { DataTable } from '@/components/ui/table/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchMemberWithRelations } from '@/shared/api';
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';
import { MemberDetailSheet } from './components/MemberDetailSheet';
import { createExcel } from './components/MemberExcel';
import { MemberTableData } from './types/views';
import { memberColumns } from './utils/columns';
import { formatMemberTableData } from './utils/helpers';

export function MemberPage() {
  const { memberManagementModule } = useUserBootstrap();

  const [openDetailSheet, setOpenDetailSheet] = useState(false);

  const [rowSelected, setRowSelected] = useState<MemberTableData | null>(null);

  //
  const fetchMemberWithRelationsQuery = useQuery({
    queryKey: ['fetchMemberWithRelations', memberManagementModule],
    queryFn: async () => {
      const fetched = await fetchMemberWithRelations(
        memberManagementModule?.memberIds ?? [],
      );

      if (!fetched) {
        return;
      }

      return formatMemberTableData(fetched);
    },
    enabled: !!memberManagementModule,
  });

  const onClickExport = async () => {
    await createExcel();
  };

  return (
    <>
      <div className="@container/main flex flex-col gap-2 pb-4">
        <div className="flex flex-col gap-4 py-1 md:gap-6 md:py-2">
          <SectionCards />
        </div>
      </div>

      <Tabs
        defaultValue="totalMembers"
        className="flex w-full flex-col justify-start gap-6"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="totalMembers">전체</TabsTrigger>

            <TabsTrigger value="expiringSoonMembers">
              만료 예정 회원
            </TabsTrigger>

            <TabsTrigger value="recentlyExpiredMembers">
              최근 만료 회원
            </TabsTrigger>

            <TabsTrigger value="recentlyRegisteredMembers">
              최근 등록 회원
            </TabsTrigger>
          </TabsList>

          <Button onClick={onClickExport}>Export</Button>
        </div>

        <TabsContent value="totalMembers">
          <DataTable
            columns={memberColumns}
            data={fetchMemberWithRelationsQuery.data ?? []}
            //
            filterKey="name"
            onRowClick={(row) => {
              setRowSelected(row);
              setOpenDetailSheet(true);
            }}
          />

          {rowSelected && (
            <MemberDetailSheet
              open={openDetailSheet}
              setOpen={setOpenDetailSheet}
              member={rowSelected}
            />
          )}
        </TabsContent>

        <TabsContent value="expiringSoonMembers">
          <DataTable
            columns={memberColumns}
            data={fetchMemberWithRelationsQuery.data ?? []}
            //
            filterKey="name"
            onRowClick={(row) => {
              setRowSelected(row);
              setOpenDetailSheet(true);
            }}
          />
        </TabsContent>

        <TabsContent value="recentlyExpiredMembers">
          <DataTable
            columns={memberColumns}
            data={fetchMemberWithRelationsQuery.data ?? []}
            //
            filterKey="name"
            onRowClick={(row) => {
              setRowSelected(row);
              setOpenDetailSheet(true);
            }}
          />
        </TabsContent>

        <TabsContent value="recentlyRegisteredMembers">
          <DataTable
            columns={memberColumns}
            data={fetchMemberWithRelationsQuery.data ?? []}
            //
            filterKey="name"
            onRowClick={(row) => {
              setRowSelected(row);
              setOpenDetailSheet(true);
            }}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
