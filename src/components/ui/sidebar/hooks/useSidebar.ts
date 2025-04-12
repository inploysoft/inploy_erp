import { useContext } from 'react';

import { SidebarContext } from '../context/SideBarContext';

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}
