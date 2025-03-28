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

import { sideBarMenus } from '@/constants/sidebar';
import { SidebarLayoutProps } from '@/types/global';

type AppSidebarProps = ComponentProps<typeof Sidebar> & SidebarLayoutProps;

export function AppSidebar({ module, ...props }: AppSidebarProps) {
  const menus = sideBarMenus[module];

  return (
    <Sidebar {...props}>
      <a href="/">
        <header className="flex h-16 items-center gap-2 border-b px-6">
          {/* 20250328 회사 로고 추가 */}
          <h1>Inploy</h1>
        </header>
      </a>

      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        {menus.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild={true} isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
