import { MembershipDurationUnit } from '@/models/membership';

import { MembershipRegisterType } from '@/models/membership';

export interface CreateMembership {
  moduleInstanceId: string;
  registerType: MembershipRegisterType;
  displayName: string;
  durationValue?: number;
  durationUnit?: MembershipDurationUnit;
  sessionCount?: number;
  price: number;
}
