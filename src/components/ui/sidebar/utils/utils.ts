import {
  coreSideBarData,
  memberManagementSideBarData,
  workforceSideBarData,
} from '@/components/ui/sidebar/utils/constants';
import { NavMenu } from '@/components/ui/sidebar/utils/types';
import { FetchPurchasedModule2 } from '@/shared/types/api';

import { InployModules } from '@/shared/types/types';

export function createNavMenus(modules: FetchPurchasedModule2[]): NavMenu[] {
  const result: NavMenu[] = [...coreSideBarData];

  for (const module of modules) {
    if (module.module.moduleType === InployModules.Workforce) {
      result.push(...workforceSideBarData);
    }

    if (module.module.moduleType === InployModules.MemberManagement) {
      result.push(...memberManagementSideBarData);
    }
  }

  return result;
}
