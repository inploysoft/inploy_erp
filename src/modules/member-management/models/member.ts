import { CustomField, Nullable } from '@/shared/types/types';

export interface Member {
  moduleInstanceId: Nullable<string>;
  name: Nullable<string>;
  gender: Nullable<string>;
  birthDate: Nullable<string>;
  phone: string;
  customFields: Nullable<CustomField>;
  id: string;
  createdAt: string;
  updatedAt: string;
}
