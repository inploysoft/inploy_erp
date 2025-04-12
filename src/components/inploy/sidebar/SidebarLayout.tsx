import { CSSProperties, useCallback, useEffect, useState } from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';

import { NavBreadCrumb } from '@/components/types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { navBreadCrumb } from '@/constants/sidebar';
import { useCoreContext } from '@/contexts/CoreContext';
import { SidebarProvider } from '@/contexts/SidebarProvider';
import {
  FetchPurchasedModule,
  selectionSet,
} from '@/types/member-management/api';
import { Outlet } from 'react-router';
import { AppSidebar } from './AppSidebar';

const client = generateClient<Schema>();

export function SidebarLayout() {
  const { user, signOut } = useAuthenticator();

  const { getPurchasedModules } = useCoreContext();

  //
  const [purchasedModules, setPurchasedModules] = useState<
    FetchPurchasedModule[]
  >([]);

  const [navMenus, setNavMenus] = useState<NavBreadCrumb>(navBreadCrumb);

  useEffect(() => {
    const handler = async () => {
      const { data: companyMember, errors: companyMemberErrors } =
        await client.models.CompanyMember.list({
          authMode: 'userPool',
          filter: {
            sub: { eq: user.userId },
          },
        });

      if (companyMemberErrors || !companyMember[0].companyId) {
        console.log('FetchCompanyMemberError: ', companyMemberErrors);

        return;
      }

      const { data: company, errors: companyErrors } =
        await client.models.Company.get(
          {
            id: companyMember[0].companyId,
          },
          {
            authMode: 'userPool',
          },
        );

      if (companyErrors || !company?.purchasedModuleId) {
        console.log('FetchCompanyError: ', companyErrors);
        return;
      }

      const { data: purchasedModules, errors: purchasedModuleErrors } =
        await client.models.PurchasedModule.list({
          authMode: 'userPool',
          filter: {
            companyId: { eq: companyMember[0].companyId! },
          },
          selectionSet: selectionSet,
        });

      if (purchasedModuleErrors) {
        console.log('FetchPurchaseError: ', purchasedModuleErrors);

        return;
      }

      console.log(purchasedModules);

      setPurchasedModules(purchasedModules);

      getPurchasedModules(purchasedModules);
    };

    void handler();
  }, [user, getPurchasedModules]);

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
      <AppSidebar
        purchasedModules={purchasedModules}
        onSendNavMenus={handleNavMenu}
      />

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
