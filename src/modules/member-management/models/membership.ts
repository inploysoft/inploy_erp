import { CustomField, Nullable } from '@/shared/types/types';

export type MembershipRegisterType = 'duration' | 'count';

export type MembershipDurationUnit = 'minute' | 'hour' | 'day' | 'month';

export interface Membership {
  moduleInstanceId: Nullable<string>;
  id: string;
  //
  registerType: Nullable<MembershipRegisterType>;
  displayName: Nullable<string>;
  durationValue: Nullable<number>;
  durationUnit: Nullable<MembershipDurationUnit>;
  sessionCount: Nullable<number>;
  price: Nullable<number>;
  customFields: Nullable<CustomField>;
  createdAt: string;
  updatedAt: string;
}
