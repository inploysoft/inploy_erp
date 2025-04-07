import { Nullable } from '@/types/global';

export type MembershipRegisterType = 'count' | 'monthly';

export type MembershipStatusType = 'valid' | 'expired';

export interface Membership {
  moduleInstanceId: Nullable<string>;
  memberId: Nullable<string>;
  membershipType: Nullable<string>;
  name: Nullable<string>;
  months: Nullable<number>;
  counts: Nullable<number>;
  registerType: Nullable<MembershipRegisterType>;
  price: Nullable<number>;
  status: Nullable<MembershipStatusType>;
  customFields: (string | number | boolean | object | null)[] | null;
  registeredAt: Nullable<string>;
  id: string;
  createdAt: string;
  updatedAt: string;
}
