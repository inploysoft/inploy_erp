import { Nullable } from '@/types/global';

export interface Member {
  moduleInstanceId: Nullable<string>;
  name: Nullable<string>;
  gender: Nullable<string>;
  birthDate: Nullable<string>;
  customFields: (string | number | boolean | object | null)[] | null;
  id: string;
  createdAt: string;
  updatedAt: string;
}
