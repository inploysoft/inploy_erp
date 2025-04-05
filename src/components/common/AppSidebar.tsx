import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { ChevronRight } from 'lucide-react';

import { SearchForm } from '@/components/common/SearchForm';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { NavMenu } from '@/constants/sidebar';
import { createNavMenus } from '@/lib/utils';
import { SidebarLayoutProps } from '@/types/global';

type AppSidebarProps = ComponentProps<typeof Sidebar> & SidebarLayoutProps;

export function AppSidebar({
  purchasedModules,
  onSendNavMenus,
  ...props
}: AppSidebarProps) {
  const location = useLocation();

  const [navMenus, setNavMenus] = useState<NavMenu[]>([]);

  useEffect(() => {
    const result = createNavMenus(purchasedModules);

    setNavMenus(result);
  }, [onSendNavMenus, purchasedModules]);

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
