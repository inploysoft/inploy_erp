import { CSSProperties, useCallback, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { signOut } from 'aws-amplify/auth';

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
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';
import { awsLogger } from '@/shared/lib/config';
import { Button } from '../button/button';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from './context/SidebarProvider';
import { SidebarInset, SidebarTrigger } from './Sidebar';
import { NavBreadCrumb } from './utils/types';

export function SidebarLayout() {
  const { awsGetCurrentUserQuery } = useUserBootstrap();

  if (awsGetCurrentUserQuery.isError) {
    awsLogger.error('LoginError' + awsGetCurrentUserQuery.error);

    // TODO: 20250502 alert 디자인 변경
    alert('예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.');

    history.back();
  }

  const navigate = useNavigate();

  const [navMenus, setNavMenus] = useState<NavBreadCrumb>(navBreadCrumb);

  const handleNavMenu = useCallback((menu: string, menuItem: string) => {
    setNavMenus({
      menu: menu,
      menuItem: menuItem,
    });
  }, []);

  const onClickSignOut = async () => {
    await signOut();

    navigate('/signin');
  };

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

            <Button onClick={onClickSignOut}>Sign out</Button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
