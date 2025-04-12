import {
  coreSideBarData,
  memberManagementSideBarData,
} from '@/components/ui/sidebar/utils/constants';
import { NavMenu } from '@/components/ui/sidebar/utils/types';
import { FetchPurchasedModule } from '@/modules/member-management/types/api';
import { InployModules } from '@/shared/types';

export function createNavMenus(modules: FetchPurchasedModule[]): NavMenu[] {
  const result: NavMenu[] = [...coreSideBarData];

  for (const module of modules) {
    if (module.module.moduleType === InployModules.MemberManagement) {
      result.push(...memberManagementSideBarData);
    }
  }

  return result;
}
