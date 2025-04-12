import { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router';

import { SidebarLayout } from '@/components/inploy/sidebar/SidebarLayout';
import { ModuleConfiguration } from '@/modules/core/ModuleConfiguration';
import { UserDashboard } from '@/modules/core/UserDashboard';
import { Member } from '@/modules/member-management/Member';
import { MembershipPage } from '@/modules/member-management/MembershipPage';

// TODO: 20250322 Create loading component
const loading = <div>Loading...</div>;

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SidebarLayout />,
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
      {
        path: 'member',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={loading}>
                <Member />
              </Suspense>
            ),
          },
          {
            path: 'membership',
            element: (
              <Suspense fallback={loading}>
                <MembershipPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
