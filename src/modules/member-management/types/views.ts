/* UI 에서 쓰는 조합형 타입 */
import { z } from 'zod';

import {
  MembershipRegistration,
  MembershipRegistrationStatus,
} from '@/modules/member-management/models/membershipRegistration';
import { OmitId } from '@/shared/types/types';
import { Member } from '../models/member';
import { MembershipPlan } from '../models/membershipPlan';
import { MembershipType } from '../models/membershipType';
import { memberExcelSchema } from './api';

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

//
export type MemberTableData = Omit<
  Member,
  'moduleInstanceId' | 'createdAt' | 'updatedAt'
> & {
  memberships: MemberTableMembership[];
};

export type MemberTableMembership = OmitId<MembershipPlan> &
  OmitId<MembershipType> &
  OmitId<MembershipRegistration> & {
    membershipPlanId: string;
    membershipTypeId: string;
    membershipRegistrationId: string;
    trainerId: string;
    status: string;
    trainer: string;
  };

//
export interface MembershipTableData {
  displayName: string;
  plans: MembershipPlan[];
}
