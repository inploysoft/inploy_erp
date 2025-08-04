import { CustomField, Nullable } from '@/shared/types/types';

export interface MembershipType {
  moduleInstanceId: Nullable<string>;
  id: string;
  //
  displayName: Nullable<string>;
  isActive: Nullable<boolean>;
  description: Nullable<string>;
  customFields: Nullable<CustomField>;
  createdAt: string;
  updatedAt: string;
}
