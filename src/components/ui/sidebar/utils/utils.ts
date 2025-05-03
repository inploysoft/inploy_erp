import {
  coreSideBarData,
  memberManagementSideBarData,
  schedularSideBarData,
  workforceSideBarData,
} from '@/components/ui/sidebar/utils/constants';
import { NavMenu } from '@/components/ui/sidebar/utils/types';
import { InployModule } from '@/shared/types/types';
import type { Schema } from '../../../../../amplify/data/resource';

/**
 * 사이드바 메뉴 생성
 * @param modules
 * @returns 사이드바 메뉴
 */
export function createNavMenus(modules: Schema['Module']['type'][]): NavMenu[] {
  const result: NavMenu[] = [...coreSideBarData];

  for (const module of modules) {
    const moduleType = module.moduleType as InployModule;

    if (moduleType === 'memberManagement') {
      result.push(...memberManagementSideBarData);
    }

    if (moduleType === 'workforce') {
      result.push(...workforceSideBarData);
    }

    if (moduleType === 'scheduler') {
      result.push(...schedularSideBarData);
    }
  }

  return result;
}
