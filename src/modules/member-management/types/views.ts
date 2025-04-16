/* UI 에서 쓰는 조합형 타입 */

import { CompanyMember } from '@/modules/member-management/models/companyMember';
import { Member } from '@/modules/member-management/models/member';
import { Membership } from '@/modules/member-management/models/membership';
import { MembershipRegistration } from '@/modules/member-management/models/membershipRegistration';
import { Trainer } from '@/modules/workforce/models/trainer';

export type MemberTableData = Omit<
  Member,
  'moduleInstanceId' | 'createdAt' | 'updatedAt'
> & {
  memberships: MemberDetail[];
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
