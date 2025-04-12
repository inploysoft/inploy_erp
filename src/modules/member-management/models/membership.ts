import { Nullable } from '@/shared/types';

export type MembershipRegisterType = 'duration' | 'count';

export type MembershipDurationUnit = 'minute' | 'hour' | 'day' | 'month';

export interface Membership {
  moduleInstanceId: Nullable<string>;
  registerType: Nullable<MembershipRegisterType>;
  displayName: Nullable<string>;
  durationValue: Nullable<number>;
  durationUnit: Nullable<MembershipDurationUnit>;
  sessionCount: Nullable<number>;
  price: Nullable<number>;
  customFields: (string | number | boolean | object | null)[] | null;
  id: string;
  createdAt: string;
  updatedAt: string;
}
