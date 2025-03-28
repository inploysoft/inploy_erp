import { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router';

import { SidebarLayout } from '@/components/common/SidebarLayout';
import { ModuleConfiguration } from '@/modules/core/ModuleConfiguration';
import { UserDashboard } from '@/modules/core/UserDashboard';
import { MemberDashboard } from '@/modules/membership/MemberDashboard';
import { Module } from '@/types/global';

// TODO: 20250322 Create loading component
const loading = <div>Loading...</div>;

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SidebarLayout module={Module.Core} />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={loading}>
            <UserDashboard />
          </Suspense>
        ),
      },
      {
        path: 'module',
        element: (
          <Suspense fallback={loading}>
            <ModuleConfiguration />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: 'member',
    element: <SidebarLayout module={Module.Membership} />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={loading}>
            <MemberDashboard />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
