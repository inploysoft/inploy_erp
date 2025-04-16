import {
  MembershipDurationUnit,
  MembershipRegisterType,
} from '@/modules/member-management/models/membership';

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
