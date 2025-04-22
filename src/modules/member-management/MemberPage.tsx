import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { SectionCards } from '@/components/ui/sidebar/SectionCards';
import { DataTable } from '@/components/ui/table/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDropzoneDialog } from '@/modules/member-management/components/FileDropzoneDialog';
import { fetchMemberWithRelations } from '@/shared/api';
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';
import { H3 } from '@/theme/Typography';
import { MemberDetailSheet } from './components/MemberDetailSheet';
import { MemberTableData, MemberTableData2 } from './types/views';
import { memberColumns, memberColumns2, memberData2 } from './utils/columns';
import { parseExcel, transformMemberExcelToObjects } from './utils/excel';
import { formatMemberTableData } from './utils/helpers';

export function MemberPage() {
  const { memberManagementModule } = useUserBootstrap();

  const [openDetailSheet, setOpenDetailSheet] = useState(false);

  const [rowSelected, setRowSelected] = useState<MemberTableData | null>(null);

  //
  const [memberTable, setMemberTable] = useState<MemberTableData2[]>([]);

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

  const handleExcel = async (files: File[]) => {
    const parsedData = await parseExcel(files[0]);

    if (!parsedData) {
      return;
    }

    const result = await transformMemberExcelToObjects(parsedData);

    setMemberTable(result);
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
          <div className="flex gap-2">
            <FileDropzoneDialog onDrop={handleExcel} />
          </div>
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
          <H3>엑셀 추가하면 보임 (테이블 형식 이걸로 바꿀 예정)</H3>

          <DataTable
            columns={memberColumns2}
            data={memberData2}
            //
            filterKey="name"
            // onRowClick={(row) => {
            //   setRowSelected(row);
            //   setOpenDetailSheet(true);
            // }}
          />
        </TabsContent>

        <TabsContent value="recentlyExpiredMembers"></TabsContent>

        <TabsContent value="recentlyRegisteredMembers"></TabsContent>
      </Tabs>
    </>
  );
}
