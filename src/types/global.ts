import { FetchPurchasedModule } from './responseTypes';

// TODO: 20250330 Module 타입 재정의
export enum InployModules {
  Auth = 'auth',
  Core = 'core',
  MemberManagement = 'member_management',
  SaleManagement = 'sales_management',
}

export interface SidebarLayoutProps {
  purchasedModules: FetchPurchasedModule[];
  onSendNavMenus: (menu: string, MenuItem: string) => void;
}
