export enum Module {
  Auth = 'auth',
  Core = 'core',
  Membership = 'membership',
}

export interface SidebarLayoutProps {
  module: Module;
}
