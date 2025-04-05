import { ComponentProps, useEffect, useState } from 'react';
import { Link } from 'react-router';

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
import { NavMenu } from '@/constants/sidebar';
import { createNavMenus } from '@/lib/utils';
import { SidebarLayoutProps } from '@/types/global';
import { Skeleton } from '../ui/skeleton';

type AppSidebarProps = ComponentProps<typeof Sidebar> & SidebarLayoutProps;

export function AppSidebar({ purchasedModules, ...props }: AppSidebarProps) {
  const [navMenus, setNavMenus] = useState<NavMenu[]>([]);

  useEffect(() => {
    const result = createNavMenus(purchasedModules);

    setNavMenus(result);
  }, [navMenus.length, purchasedModules]);

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
          navMenus.map((item) => (
            <Collapsible
              key={item.title}
              title={item.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                >
                  <CollapsibleTrigger>
                    {item.title}{' '}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild={true}
                            isActive={item.isActive}
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
