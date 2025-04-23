/* UI 에서 쓰는 조합형 타입 */
import { z } from 'zod';

import { Member } from '@/modules/member-management/models/member';
import { Membership } from '@/modules/member-management/models/membership';
import {
  MembershipRegistration,
  MembershipRegistrationStatus,
} from '@/modules/member-management/models/membershipRegistration';
import { Trainer } from '@/modules/workforce/models/trainer';
import { memberExcelSchema } from './api';

export type MemberTableData = Omit<
  Member,
  'moduleInstanceId' | 'createdAt' | 'updatedAt'
> & {
  memberships: MemberDetail[];
};

export interface MemberExcelRowObject {
  name: string;
  phone: string;
  gender: string;
  birthDate: string;
  address: string;
  lastVisitedAt: string;
  FCtrainer: string;
  memoAt: string;
  memo: string;
  memberships: z.infer<typeof memberExcelSchema>[];
  latestExpiredAt: string;
  status: MembershipRegistrationStatus;
  PTtrainer: string;
}

export type MemberTableData2 = Omit<
  MemberExcelRowObject,
  'address' | 'memo' | 'memoAt' | 'latestExpiredAt' | 'gender' | 'birthDate'
>;

export type MemberDetail = Omit<
  MembershipRegistration,
  'memberId' | 'membershipId' | 'trainerId'
> &
  Membership &
  Trainer;

export type MembershipTableData = Omit<Membership, 'moduleInstanceId'>;

export type RegisteredMembership = Omit<
  MembershipRegistration,
  'moduleInstanceId' | 'memberId' | 'membershipId'
> &
  Membership;
