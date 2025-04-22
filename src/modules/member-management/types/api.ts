import {
  MembershipDurationUnit,
  MembershipRegisterType,
} from '@/modules/member-management/models/membership';

import { z } from 'zod';

export interface CreateMembership {
  moduleInstanceId: string;
  registerType: MembershipRegisterType;
  displayName: string;
  durationValue?: number;
  durationUnit?: MembershipDurationUnit;
  sessionCount?: number;
  price: number;
}

export type UpdateData<TData> = {
  id: string;
} & Partial<Omit<TData, 'id'>>;

//
export const memberExcelSchema = z.object({
  branch: z.string(),
  registerType: z.enum(['duration', 'count']),
  displayName: z.string(),
  sessionCount: z.number().optional(),
  usedSessionCount: z.number().optional(),
  durationValue: z.number().optional(),
  durationUnit: z.enum(['none', 'minute', 'hour', 'day', 'month']),
  expiredAt: z.string().date(),
});

export const memberExcelSchema2D = z.array(z.array(memberExcelSchema));

export type ParseComplexField = {
  memberships: z.infer<typeof memberExcelSchema>[];
};
