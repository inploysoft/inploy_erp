import { CustomField, Nullable } from '@/shared/types/types';

export interface Trainer {
  moduleInstanceId?: Nullable<string>;
  id: string;
  //
  sub: string;
  name: string;
  phone?: Nullable<string>;
  team?: Nullable<string>;
  customFields?: Nullable<CustomField>;
  createdAt: string;
  updatedAt: string;
}
