import { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router';

import { SidebarLayout } from '@/components/common/SidebarLayout';
import { UserDashboard } from '@/modules/core/UserDashboard';
import { MemberDashboard } from '@/modules/membership/MemberDashboard';

// TODO: 20250322 Create loading component
const loading = <div>Loading...</div>;

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={loading}>
        <UserDashboard />
      </Suspense>
    ),
  },
  {
    path: 'member',
    element: <SidebarLayout />,
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
