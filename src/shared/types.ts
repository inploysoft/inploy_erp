export type Nullable<T> = T | null;

export type CustomField = string | number | boolean | object | null;

export enum InployModules {
  Auth = 'auth',
  Core = 'core',
  MemberManagement = 'memberManagement',
  SaleManagement = 'salesManagement',
  Workforce = 'workforce',
}
