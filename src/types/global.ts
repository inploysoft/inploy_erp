// TODO: 20250330 Module 타입 재정의
export enum Module {
  Auth = 'auth',
  Core = 'core',
  Membership = 'membership',
}

export interface SidebarLayoutProps {
  module: Module;
}
