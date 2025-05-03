import { NavBreadCrumb, NavMenu } from './types';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';

export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const SIDEBAR_WIDTH = '16rem';

export const SIDEBAR_WIDTH_MOBILE = '18rem';

export const SIDEBAR_WIDTH_ICON = '3rem';

export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

//

export const navBreadCrumb: NavBreadCrumb = {
  menu: '기본 모듈',
  menuItem: '대시 보드',
};

export const coreSideBarData: NavMenu[] = [
  {
    title: '기본 모듈',
    url: '/',
    items: [
      {
        title: '대시보드',
        url: '/',
      },
      {
        title: '모듈 설정',
        url: '/module',
      },
      {
        title: '회사 정보',
        url: '/company',
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
      },
      {
        title: '이용권 관리',
        url: '/member/membership',
      },
    ],
  },
];

export const workforceSideBarData: NavMenu[] = [
  {
    title: '인사 모듈',
    url: 'workforce',
    items: [
      {
        title: '직원 관리',
        url: '/workforce/employee',
      },
      {
        title: '트레이너 관리',
        url: '/workforce/trainer',
      },
    ],
  },
];

export const schedularSideBarData: NavMenu[] = [
  {
    title: '일정 모듈',
    url: 'scheduler',
    items: [
      {
        title: '수업 관리',
        url: '/scheduler/calendar',
      },
    ],
  },
];
