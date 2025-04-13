import { CustomField, Nullable } from '@/shared/types';

export type MembershipRegistrationStatus = 'valid' | 'expired';

export interface MembershipRegistration {
  moduleInstanceId: Nullable<string>;
  memberId: Nullable<string>;
  membershipId: Nullable<string>;
  id: string;
  //
  status: Nullable<MembershipRegistrationStatus>;
  usedSessionCount: Nullable<number>;
  registeredAt: Nullable<string>;
  expiredAt: Nullable<string>;
  customFields: Nullable<CustomField[]>;
  createdAt: string;
  updatedAt: string;
}
