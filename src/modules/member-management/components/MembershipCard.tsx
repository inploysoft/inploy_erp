import dayjs from 'dayjs';

import { Badge } from '@/components/ui/badge/badge';
import { Card } from '@/components/ui/card';
import { MemberDetail } from '../types/views';
import {
  convertMembershipDurationUnitToKorean,
  convertMembershipRegisterTypeToKorean,
  getRemainingDays,
} from '../utils/helpers';

interface MembershipCardProps {
  membership: MemberDetail;
}

export function MembershipCountCard({ membership }: MembershipCardProps) {
  return (
    <Card className="mb-2 w-full p-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">
              {membership.displayName} {membership.sessionCount} 회
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="px-3 text-sm" variant="secondary">
              {convertMembershipRegisterTypeToKorean(membership.registerType)}
            </Badge>

            <Badge className="px-3 text-sm">
              {membership.sessionCount! - membership.usedSessionCount!} 회
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          등록일 {dayjs(membership.registeredAt).format('YYYY.MM.DD')}
        </p>
      </div>
    </Card>
  );
}

export function MembershipDurationCard({ membership }: MembershipCardProps) {
  return (
    <Card className="w-full p-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">
              {membership.displayName} {membership.durationValue}{' '}
              {convertMembershipDurationUnitToKorean(membership.durationUnit)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="px-3 text-sm" variant="secondary">
              {convertMembershipRegisterTypeToKorean(membership.registerType)}
            </Badge>

            <Badge className="px-3 text-sm">
              {getRemainingDays(membership.registeredAt, membership.expiredAt)}
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          {dayjs(membership.registeredAt).format('YYYY.MM.DD')} -
          {dayjs(membership.expiredAt).format('YYYY.MM.DD')}
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

export function RenderMembershipCard(membership: MemberDetail) {
  return membership.registerType === 'duration' ? (
    <MembershipDurationCard key={membership.id} membership={membership} />
  ) : (
    <MembershipCountCard key={membership.id} membership={membership} />
  );
}
