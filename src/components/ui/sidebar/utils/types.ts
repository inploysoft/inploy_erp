import { FetchPurchasedModule } from '@/modules/member-management/types/api';

//
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

export interface SidebarLayoutProps {
  purchasedModules: FetchPurchasedModule[];
  onSendNavMenus: (menu: string, MenuItem: string) => void;
}
