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
  onSendNavMenus: (menu: string, MenuItem: string) => void;
}
