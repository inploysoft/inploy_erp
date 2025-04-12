import { VariantProps } from 'class-variance-authority';

import { buttonVariants } from '@/lib/variants/button';
import { FetchPurchasedModule } from '@/types/member-management/api';

//
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

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
