import { Nullable } from '@/shared/types';

export interface CompanyMember {
  companyId: Nullable<string>;
  id: string;
  //
  sub: string;
  name: string;
  email: string;
  phone: string;
  rank: Nullable<string>;
  position: Nullable<string>;
  isAdmin: Nullable<boolean>;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}
