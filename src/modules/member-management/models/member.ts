import { Nullable } from '@/shared/types';

export interface Member {
  moduleInstanceId: Nullable<string>;
  name: Nullable<string>;
  gender: Nullable<string>;
  birthDate: Nullable<string>;
  phone: string;
  customFields: (string | number | boolean | object | null)[] | null;
  id: string;
  createdAt: string;
  updatedAt: string;
}
