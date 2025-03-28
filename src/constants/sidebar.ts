import { Module } from '@/types/global';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';

export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const SIDEBAR_WIDTH = '16rem';

export const SIDEBAR_WIDTH_MOBILE = '18rem';

export const SIDEBAR_WIDTH_ICON = '3rem';

export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

//
interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export interface SideBarData {
  title?: string;
  url: string;
  items: NavItem[];
}

export const coreSideBarData: SideBarData[] = [
  {
    title: '설정',
    url: '#',
    items: [
      {
        title: '모듈 설정',
        url: 'module',
        // isActive: true,
      },
    ],
  },
];

//
type SideBarMenus = Record<Module, SideBarData[]>;

export const sideBarMenus: SideBarMenus = {
  auth: [],
  core: coreSideBarData,
  membership: [],
};
