export type Nullable<T> = T | null;

export type CustomField = string | number | boolean | object | null;

export enum InployModules {
  MemberManagement = 'memberManagement',
  SaleManagement = 'salesManagement',
  Workforce = 'workforce',
}

export type InployModule = 'memberManagement' | 'workforce';
