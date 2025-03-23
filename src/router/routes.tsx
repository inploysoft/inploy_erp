import { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router';

import { SidebarLayout } from '@/components/common/SidebarLayout';
import { Main } from '@/modules/Main';
import { UserDashboard } from '@/modules/user/UserDashboard';

// TODO: 20250322 Create loading component
const loading = <div>Loading...</div>;

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: 'user',
    element: <SidebarLayout />,
    children: [
      {
        element: (
          <Suspense fallback={loading}>
            <UserDashboard />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
