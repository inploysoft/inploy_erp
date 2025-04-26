import dayjs from 'dayjs';

import { Badge } from '@/components/ui/badge/badge';
import { Card } from '@/components/ui/card';
import { MemberTableMembership } from '../types/views';
import {
  convertMembershipDurationUnitToKorean,
  getRemainingDays,
} from '../utils/helpers';

interface MembershipCardProps {
  memberships: MemberTableMembership;
}

export function MembershipCountCard({ memberships }: MembershipCardProps) {
  return (
    <Card className="mb-2 w-full p-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">
              {memberships.displayName} {memberships.sessionCount} 회
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* <Badge className="px-3 text-sm" variant="secondary">
              {convertMembershipRegisterTypeToKorean(membership.registerType)}
            </Badge> */}

            <Badge className="px-3 text-sm">
              {memberships.sessionCount! - memberships.usedSessionCount!} 회
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          등록일 {dayjs(memberships.registeredAt).format('YYYY.MM.DD')}
        </p>
      </div>
    </Card>
  );
}

export function MembershipCard({ memberships }: MembershipCardProps) {
  return (
    <Card className="mb-3 w-full p-8">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-lg font-bold">
              {memberships.displayName} {memberships.durationValue}{' '}
              {convertMembershipDurationUnitToKorean(memberships.durationUnit)}
            </p>
          </div>

          <div className="flex items-center">
            <Badge className="px-3 text-sm">
              {getRemainingDays(
                memberships.registeredAt,
                memberships.expiredAt,
              )}
            </Badge>
          </div>
        </div>

        <p className="text-muted-foreground text-sm">
          {dayjs(memberships.registeredAt).format('YYYY.MM.DD')} -
          {dayjs(memberships.expiredAt).format('YYYY.MM.DD')}
        </p>
      </div>
    </Card>
  );
}

export function EmptyMembershipMessage({ message }: { message: string }) {
  return (
    <p className="text-muted-foreground text-md flex min-h-[25rem] items-center justify-center">
      {message}
    </p>
  );
}
