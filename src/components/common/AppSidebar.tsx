import { ComponentProps } from 'react';

import { SearchForm } from '@/components/common/SearchForm';
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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { navData, sideBarMenus } from '@/constants/sidebar';
import { SidebarLayoutProps } from '@/types/global';
import { ChevronRight } from 'lucide-react';

type AppSidebarProps = ComponentProps<typeof Sidebar> & SidebarLayoutProps;

export function AppSidebar({ module, ...props }: AppSidebarProps) {
  const menus = sideBarMenus[module];

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
        {navData.navMain.map((item) => (
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
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
