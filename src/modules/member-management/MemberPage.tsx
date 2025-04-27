import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { SectionCards } from '@/components/ui/sidebar/SectionCards';
import { DataTable } from '@/components/ui/table/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDropzoneDialog } from '@/modules/member-management/components/FileDropzoneDialog';
import { fetchMemberWithRelations } from '@/shared/api';
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';
import { cn } from '@/shared/lib/utils';
import { MemberDetailSheet } from './components/MemberDetailSheet';
import { MemberExcelRowObject, MemberTableData } from './types/views';
import { memberColumns } from './utils/columns';
import { parseExcel, transformMemberExcelToObjects } from './utils/excel';
import { formatMemberTableData, isWithin30Days } from './utils/helpers';

const membershipTypes = [
  '전체',
  '(무신사)새해 다짐 베이직 패키지',
  '구독 베이직 헬스(12개월 약정)',
  '구독 베이직 헬스(무약정)',
  '구독 프리미엄(Premium)',
  '구독 프리미엄(Premium2)',
  '구독 베이직 헬스(Basic)',
  '헬스락커',
  '비정기결제 헬스',
  '헬스회원권',
  '1:1 OT',
  '일일 이용권',
  '구독 베이직 헬스 24년 할인특가',
  '1:1 PT',
];

export function MemberPage() {
  const { memberManagementModule } = useUserBootstrap();

  const [openDetailSheet, setOpenDetailSheet] = useState(false);

  const [rowSelected, setRowSelected] = useState<MemberTableData | null>(null);
  const [_memberTable, setMemberTable] = useState<MemberExcelRowObject[]>([]);

  const [selectedType, setSelectedType] = useState<string>();

  const fetchMemberWithRelationsQuery = useQuery({
    queryKey: ['formatMemberTableData', memberManagementModule],
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
        className="flex w-full flex-col justify-start gap-4"
        //
        defaultValue="totalMembers"
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

        {/* 30일 이내 만료 예정 회원 */}
        <TabsContent value="expiringSoonMembers">
          <Card className="@container/card">
            <CardHeader className="relative">
              <ScrollArea className="w-full overflow-x-auto">
                <div className="flex min-w-[1000px] gap-2 whitespace-nowrap">
                  {membershipTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        'rounded-full border px-4 py-1 text-sm transition',
                        selectedType === type
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100',
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <ScrollBar hidden orientation="horizontal" />
              </ScrollArea>
            </CardHeader>

            <CardContent>
              <DataTable
                columns={memberColumns}
                data={isWithin30Days(fetchMemberWithRelationsQuery.data ?? [])}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recentlyExpiredMembers"></TabsContent>

        <TabsContent value="recentlyRegisteredMembers"></TabsContent>
      </Tabs>
    </>
  );
}
