import { FetchPurchasedModule } from './responseTypes';

// TODO: 20250330 Module 타입 재정의
export enum InployModules {
  Auth = 'auth',
  Core = 'core',
  MemberManagement = 'member_management',
  SaleManagement = 'sales_management',
}

export interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export interface NavMenu {
  title: string;
  url?: string;
  items: NavItem[];
}

export interface NavBreadCrumb {
  menu: string;
  menuItem: string;
}

//
export interface SidebarLayoutProps {
  purchasedModules: FetchPurchasedModule[];
  onSendNavMenus: (menu: string, MenuItem: string) => void;
}
