import { useState } from 'react';

import { SectionCards } from '@/components/ui/sidebar/SectionCards';
import { DataTable } from '@/components/ui/table/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCoreContext } from '@/shared/contexts/CoreContext';

import { MemberDetailSheet } from './MemberDetailSheet';
import { MemberTableData } from './types/views';
import { memberColumns } from './utils/columns';
import { memberData } from './utils/constants';

export function MemberPage() {
  const { memberTableData } = useCoreContext();

  //
  const [openDetailSheet, setOpenDetailSheet] = useState(false);

  const [rowSelected, setRowSelected] = useState<MemberTableData | null>(null);

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
        <TabsList>
          <TabsTrigger value="totalMembers">전체</TabsTrigger>

          <TabsTrigger value="expiringSoonMembers">만료 예정 회원</TabsTrigger>

          <TabsTrigger value="recentlyExpiredMembers">
            최근 만료 회원
          </TabsTrigger>

          <TabsTrigger value="recentlyRegisteredMembers">
            최근 등록 회원
          </TabsTrigger>
        </TabsList>

        <TabsContent value="totalMembers">
          <DataTable
            columns={memberColumns}
            data={memberTableData}
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
          <DataTable columns={memberColumns} data={memberData} />
        </TabsContent>

        <TabsContent value="recentlyExpiredMembers">
          <DataTable columns={memberColumns} data={memberData} />
        </TabsContent>

        <TabsContent value="recentlyRegisteredMembers">
          <DataTable columns={memberColumns} data={memberData} />
        </TabsContent>
      </Tabs>
    </>
  );
}
