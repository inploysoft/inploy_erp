import {
  coreSideBarData,
  memberManagementSideBarData,
  workforceSideBarData,
} from '@/components/ui/sidebar/utils/constants';
import { NavMenu } from '@/components/ui/sidebar/utils/types';
import { InployModules } from '@/shared/types/types';
import type { Schema } from '../../../../../amplify/data/resource';

/**
 * 사이드바 메뉴 생성
 * @param modules
 * @returns 사이드바 메뉴
 */
export function createNavMenus(modules: Schema['Module']['type'][]): NavMenu[] {
  const result: NavMenu[] = [...coreSideBarData];

  for (const module of modules) {
    if (module.moduleType === InployModules.Workforce) {
      result.push(...workforceSideBarData);
    }
    if (module.moduleType === InployModules.MemberManagement) {
      result.push(...memberManagementSideBarData);
    }
  }

  return result;
}
