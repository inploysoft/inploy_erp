import { CustomField, Nullable } from '@/shared/types/types';

export type MembershipRegistrationStatus = 'valid' | 'expired';

export interface MembershipRegistration {
  moduleInstanceId: Nullable<string>;
  memberId: Nullable<string>;
  membershipId: Nullable<string>;
  trainerId: Nullable<string>;
  id: string;
  //
  status: Nullable<MembershipRegistrationStatus>;
  usedSessionCount: Nullable<number>;
  registeredAt: Nullable<string>;
  expiredAt: Nullable<string>;
  customFields: Nullable<CustomField>;
  createdAt: string;
  updatedAt: string;
}
