import { Outlet } from 'react-router';

import { useAuthenticator } from '@aws-amplify/ui-react';

import { AppSidebar } from '@/components/common/AppSidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarProvider } from '@/contexts/SidebarProvider';
import { SidebarLayoutProps } from '@/types/global';

export function SidebarLayout({ module }: SidebarLayoutProps) {
  const { signOut } = useAuthenticator();

  return (
    <SidebarProvider>
      <AppSidebar module={module} />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-6">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="flex items-center justify-between w-full">
            <h1>User Dashboard</h1>

            <button onClick={signOut}>Sign out</button>
          </div>
          {/* <Breadcrumb>
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
          </Breadcrumb> */}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
