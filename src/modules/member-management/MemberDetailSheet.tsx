import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { H4 } from '@/theme/Typography';
import {
  EmptyMembershipMessage,
  RenderMembershipCard,
} from './components/MembershipCard';
import { MemberTableData } from './types/views';

interface MemberDetailSheetProps {
  member: MemberTableData;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MemberDetailSheet({
  member,
  open,
  setOpen,
}: MemberDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full max-w-none p-2 sm:w-[50vw]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">{member.name}</SheetTitle>

          <SheetDescription>
            {member.birthDate} | {member.gender} | {member.phone}
          </SheetDescription>

          <Card className="min-h-[25rem] w-full">
            <CardHeader>
              <CardTitle>
                <H4>이용권</H4>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="valid">사용 중</TabsTrigger>
                  <TabsTrigger value="expired">만료</TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[20rem] pt-3">
                  <TabsContent value="all">
                    {member.memberships.map(RenderMembershipCard)}
                  </TabsContent>

                  <TabsContent value="valid">
                    {member.memberships.some((m) => m.status === 'valid') ? (
                      member.memberships
                        .filter((m) => m.status === 'valid')
                        .map(RenderMembershipCard)
                    ) : (
                      <EmptyMembershipMessage message="사용 중인 이용권이 없어요" />
                    )}
                  </TabsContent>

                  <TabsContent value="expired">
                    {member.memberships.some((m) => m.status === 'expired') ? (
                      member.memberships
                        .filter((m) => m.status === 'expired')
                        .map(RenderMembershipCard)
                    ) : (
                      <EmptyMembershipMessage message="만료된 이용권이 없어요" />
                    )}
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
