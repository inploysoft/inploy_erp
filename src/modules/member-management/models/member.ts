import { CustomField, Nullable } from '@/shared/types/types';

export interface Member {
  moduleInstanceId: Nullable<string>;
  id: string;
  //
  name: Nullable<string>;
  gender: Nullable<string>;
  phone: string;
  birthDate: Nullable<string>;
  address: Nullable<string>;
  lastVisitedAt: Nullable<string>;
  registeredAt: Nullable<string>;
  customFields: Nullable<CustomField>;
  createdAt: string;
  updatedAt: string;
}
