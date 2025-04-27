import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { LucideCake, LucidePhone, LucideVenusAndMars } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { H4 } from '@/theme/Typography';
import { MemberTableData } from '../types/views';
import { isExpired } from '../utils/helpers';
import { EmptyMembershipMessage, MembershipCard } from './MembershipCard';

interface MemberDetailSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  member: MemberTableData;
}

export function MemberDetailSheet({
  open,
  setOpen,
  member,
}: MemberDetailSheetProps) {
  const validMemberships = member.memberships.filter(
    (membership) => !isExpired(membership.expiredAt!),
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full max-w-none p-2 sm:w-[50vw]">
        <SheetHeader className="mt-5">
          <Card className="w-full p-5">
            <SheetTitle className="text-2xl font-bold">
              {member.name}
            </SheetTitle>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <LucideCake className="h-5 w-5" />
                <span>{member.birthDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <LucideVenusAndMars className="h-5 w-5" />
                <span>{member.gender}</span>
              </div>

              <div className="flex items-center gap-2">
                <LucidePhone className="h-5 w-5" />
                <span>{member.phone}</span>
              </div>
            </div>
          </Card>

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

                  <TabsTrigger value="valid">유효</TabsTrigger>

                  <TabsTrigger value="expired">만료</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  {member.memberships.map((value, index) => (
                    <MembershipCard key={index} memberships={value} />
                  ))}
                </TabsContent>

                <TabsContent value="valid">
                  {validMemberships.length > 0 ? (
                    validMemberships.map((membership, index) => (
                      <MembershipCard key={index} memberships={membership} />
                    ))
                  ) : (
                    <EmptyMembershipMessage message="유효한 이용권이 없어요" />
                  )}
                </TabsContent>

                <TabsContent value="expired">
                  {validMemberships.length === 0 ? (
                    validMemberships.map((membership, index) => (
                      <MembershipCard key={index} memberships={membership} />
                    ))
                  ) : (
                    <EmptyMembershipMessage message="만료된 이용권이 없어요" />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </SheetHeader>

        <SheetDescription />
      </SheetContent>
    </Sheet>
  );
}
