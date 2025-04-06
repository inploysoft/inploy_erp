import { DataTable } from '@/components/common/table/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tableMock } from '@/constants/mock';

import { SectionCards } from '@/components/common/SectionCards';
import { columns } from './columns';

export function Member() {
  return (
    <>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards></SectionCards>
          {/* <div className="bg-amber-200">총 등록 회원 수</div>
        <div className="bg-amber-200">만료 예정 회원 수</div>
        <div className="bg-amber-200">최근 만료 회원 수</div>
        <div className="bg-amber-200">최근 등록한 회원 수</div> */}
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
          <DataTable columns={columns} data={tableMock} />
        </TabsContent>
        <TabsContent value="expiringSoonMembers">
          <DataTable columns={columns} data={tableMock} />
        </TabsContent>{' '}
        <TabsContent value="recentlyExpiredMembers">
          <DataTable columns={columns} data={tableMock} />
        </TabsContent>{' '}
        <TabsContent value="recentlyRegisteredMembers">
          <DataTable columns={columns} data={tableMock} />
        </TabsContent>
      </Tabs>
    </>
  );
}
