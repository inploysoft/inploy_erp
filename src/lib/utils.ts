import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  coreSideBarData,
  memberManagementSideBarData,
  NavMenu,
} from '@/constants/sidebar';
import { InployModules } from '@/types/global';
import { FetchPurchasedModule } from '@/types/responseTypes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createNavMenus(modules: FetchPurchasedModule[]): NavMenu[] {
  const result: NavMenu[] = [...coreSideBarData];

  for (const module of modules) {
    if (module.module.moduleType === InployModules.MemberManagement) {
      result.push(...memberManagementSideBarData);
    }
  }

  return result;
}
