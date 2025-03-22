import { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router';

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
    element: (
      <Suspense fallback={loading}>
        <UserDashboard />
      </Suspense>
    ),
  },
];

export const router = createBrowserRouter(routes);
