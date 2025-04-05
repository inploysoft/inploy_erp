import { CSSProperties, useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

import { AppSidebar } from '@/components/common/AppSidebar';
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
import { SidebarProvider } from '@/contexts/SidebarProvider';
import { FetchPurchasedModule, selectionSet } from '@/types/responseTypes';

const client = generateClient<Schema>();

export function SidebarLayout() {
  const { user, signOut } = useAuthenticator();
  const [purchasedModules, setPurchasedModules] = useState<
    FetchPurchasedModule[]
  >([]);

  useEffect(() => {
    const handler = async () => {
      const { data: companyUser, errors: companyUserErrors } =
        await client.models.CompanyUser.list({
          authMode: 'userPool',
          filter: {
            sub: { eq: user.userId },
          },
        });

      if (companyUserErrors || !companyUser[0].companyId) {
        console.log('FetchCompanyUserError: ', companyUserErrors);

        return;
      }

      const { data: company, errors: companyErrors } =
        await client.models.Company.get(
          {
            id: companyUser[0].companyId,
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
            companyId: { eq: companyUser[0].companyId! },
          },
          selectionSet: selectionSet,
        });

      if (purchasedModuleErrors) {
        console.log('FetchPurchaseError: ', purchasedModuleErrors);

        return;
      }

      console.log(purchasedModules);

      setPurchasedModules(purchasedModules);
    };

    void handler();
  }, [user]);

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as CSSProperties
      }
    >
      <AppSidebar purchasedModules={purchasedModules} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="mr-2 flex w-full items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
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
