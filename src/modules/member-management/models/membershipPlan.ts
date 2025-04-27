import { CustomField, Nullable } from '@/shared/types/types';
import { MembershipDurationUnit, MembershipRegisterType } from './membership';

export interface MembershipPlan {
  moduleInstanceId: Nullable<string>;
  membershipTypeId: Nullable<string>;
  id: string;
  //
  registerType: Nullable<MembershipRegisterType>;
  durationValue: Nullable<number>;
  durationUnit: Nullable<MembershipDurationUnit>;
  sessionCount: Nullable<number>;
  price: Nullable<number>;
  description: Nullable<string>;
  customFields: Nullable<CustomField>;
  createdAt: string;
  updatedAt: string;
}
