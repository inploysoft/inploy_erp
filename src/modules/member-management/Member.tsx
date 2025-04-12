import { SectionCards } from '@/components/inploy/sidebar/SectionCards';
import { DataTable } from '@/components/inploy/table/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { memberData } from '@/constants/mock';
import { useCoreContext } from '@/contexts/CoreContext';
import { memberColumns } from './columns';

export function Member() {
  const { memberTableData } = useCoreContext();

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
          <DataTable columns={memberColumns} data={memberTableData} />
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
