import { CSSProperties, useCallback, useState } from 'react';
import { Outlet } from 'react-router';

import { useAuthenticator } from '@aws-amplify/ui-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { navBreadCrumb } from '@/components/ui/sidebar/utils/constants';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from './context/SidebarProvider';
import { SidebarInset, SidebarTrigger } from './Sidebar';
import { NavBreadCrumb } from './utils/types';

export function SidebarLayout() {
  const { signOut } = useAuthenticator();

  const [navMenus, setNavMenus] = useState<NavBreadCrumb>(navBreadCrumb);

  const handleNavMenu = useCallback((menu: string, menuItem: string) => {
    setNavMenus({
      menu: menu,
      menuItem: menuItem,
    });
  }, []);

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as CSSProperties
      }
    >
      <AppSidebar onSendNavMenus={handleNavMenu} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="mr-2 flex w-full items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{navMenus.menu}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                  <BreadcrumbPage>{navMenus.menuItem}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <button onClick={signOut}>Sign out</button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
