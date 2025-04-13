import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { useAuthenticator } from '@aws-amplify/ui-react';

import { useQuery } from '@tanstack/react-query';

import { ChevronRight } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { createNavMenus } from '@/components/ui/sidebar/utils/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchLoginUser, fetchPurchasedModules } from '@/shared/api';
import { SearchForm } from './SearchForm';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from './Sidebar';
import { NavMenu, SidebarLayoutProps } from './utils/types';

type AppSidebarProps = ComponentProps<typeof Sidebar> & SidebarLayoutProps;

export function AppSidebar({ onSendNavMenus, ...props }: AppSidebarProps) {
  const { user } = useAuthenticator();
  const location = useLocation();

  const [navMenus, setNavMenus] = useState<NavMenu[]>([]);

  const { data: loginUser } = useQuery({
    queryKey: ['fetchLoginUser', user.userId],
    queryFn: () => fetchLoginUser(user.userId),
    enabled: !!user,
  });

  const companyId = loginUser?.companyId;

  const { data: purchasedModules } = useQuery({
    queryKey: ['fetchPurchasedModules', companyId],
    queryFn: () => fetchPurchasedModules(companyId),
    enabled: !!companyId,
  });

  useEffect(() => {
    if (!purchasedModules) {
      return;
    }

    const result = createNavMenus(purchasedModules);

    setNavMenus(result);
  }, [purchasedModules]);

  const handleClickMenu = useCallback(
    (menu: string, menuItem: string) => () => {
      onSendNavMenus(menu, menuItem);
    },
    [onSendNavMenus],
  );

  return (
    <Sidebar variant="floating" {...props}>
      <a href="/">
        <header className="flex h-16 items-center gap-2 border-b px-6">
          {/* 20250328 회사 로고 추가 */}
          <h1>Inploy</h1>
        </header>
      </a>

      <SidebarHeader {...props}>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        {navMenus.length === 1 ? (
          <Skeleton />
        ) : (
          navMenus.map((menu) => (
            <Collapsible
              key={menu.title}
              title={menu.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup key={menu.title}>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                >
                  <CollapsibleTrigger>
                    {menu.title}{' '}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {menu.items.map((item) => (
                        <SidebarMenuItem
                          key={item.title}
                          onClick={handleClickMenu(menu.title, item.title)}
                        >
                          <SidebarMenuButton
                            asChild={true}
                            isActive={location.pathname === item.url}
                          >
                            <Link to={item.url}>{item.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))
        )}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
