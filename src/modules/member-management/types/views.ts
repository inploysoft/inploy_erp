/* UI 에서 쓰는 조합형 타입 */

import { CompanyMember } from '@/modules/member-management/models/companyMember';
import { Member } from '@/modules/member-management/models/member';
import { Membership } from '@/modules/member-management/models/membership';
import { MembershipRegistration } from '@/modules/member-management/models/membershipRegistration';
import { Trainer } from '@/modules/workforce/models/trainer';
import { FetchMemberWithRelations } from '@/shared/types/api';

// TODO: 20250406
// entity required 변경 -> Membership['name'] 변경,
// expiredDate, remainingDays, remainingCount -> membership[] 에 포함
export type MemberTableData = Pick<
  Member,
  'id' | 'name' | 'birthDate' | 'gender' | 'phone'
> & {
  memberships: RegisteredMembership[];
  // expiredDate: string;
  // remainingDays: number;
  // remainingCount: number;
};

export type MemberTableData2 = Omit<
  Member,
  'moduleInstanceId' | 'createdAt' | 'updatedAt'
> & {
  memberships: MemberDetail[];
};

export type dd = Omit<FetchMemberWithRelations, 'membershipRegistrationIds'> & {
  memberships: MembershipRegistration;
};

export type MemberDetail = Omit<
  MembershipRegistration,
  'memberId' | 'membershipId' | 'trainerId'
> &
  Membership &
  Trainer;

export type MembershipTableData = Omit<Membership, 'moduleInstanceId'>;

export type EmployeeTableData = Omit<CompanyMember, 'companyId' | 'createdAt'>;

export type RegisteredMembership = Omit<
  MembershipRegistration,
  'moduleInstanceId' | 'memberId' | 'membershipId'
> &
  Membership;
