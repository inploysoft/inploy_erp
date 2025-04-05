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

export interface NavMenu {
  title?: string;
  url?: string;
  items: NavItem[];
}

export const coreSideBarData: NavMenu[] = [
  {
    title: '설정',
    url: '/',
    items: [
      {
        title: '모듈 설정',
        url: 'module',
        // isActive: true,
      },
      {
        title: '회사 정보',
        url: '/company',
      },
      {
        title: '직원 관리',
        url: '/employee',
      },
    ],
  },
];

export const memberManagementSideBarData: NavMenu[] = [
  {
    title: '회원 모듈',
    url: 'member',
    items: [
      {
        title: '회원 관리',
        url: '/member',
        isActive: true,
      },
      {
        title: '이용권 관리',
        url: '/member/session',
      },
    ],
  },
];
