import { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router';

import { SidebarLayout } from '@/components/common/SidebarLayout';
import { ModuleConfiguration } from '@/modules/core/ModuleConfiguration';
import { UserDashboard } from '@/modules/core/UserDashboard';
import { Member } from '@/modules/member-management/Member';
import { Session } from '@/modules/member-management/Session';

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
            path: 'session',
            element: (
              <Suspense fallback={loading}>
                <Session />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
