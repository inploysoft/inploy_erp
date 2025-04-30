import { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router';

import { SidebarLayout } from '@/components/ui/sidebar/SidebarLayout';
import { LoginPage } from '@/modules/auth/LoginPage';
import { ModuleConfiguration } from '@/modules/core/ModuleConfiguration';
import { UserDashboard } from '@/modules/core/UserDashboard';
import { MemberPage } from '@/modules/member-management/MemberPage';
import { MembershipPage } from '@/modules/member-management/MembershipPage';
import { EmployeePage } from '@/modules/workforce/EmployeePage';
import { TrainerPage } from '@/modules/workforce/TrainerPage';
import { WorkforceDashboardPage } from '@/modules/workforce/WorkforceDashboardPage';

// TODO: 20250322 Create loading component
const loading = <div>Loading...</div>;

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
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
        path: 'system',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={loading}>
                <ModuleConfiguration />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'workforce',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={loading}>
                <WorkforceDashboardPage />
              </Suspense>
            ),
          },
          {
            path: 'employee',
            element: (
              <Suspense fallback={loading}>
                <EmployeePage />
              </Suspense>
            ),
          },
          {
            path: 'trainer',
            element: (
              <Suspense fallback={loading}>
                <TrainerPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'member',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={loading}>
                <MemberPage />
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
