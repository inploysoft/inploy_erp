import { useAuthenticator } from '@aws-amplify/ui-react';

import { useQuery } from '@tanstack/react-query';

import {
  fetchLoginUser,
  fetchModuleInstance,
  fetchModules,
  fetchPurchasedModules,
} from '../api';
import { isMemberManagementEntity, isWorkforceEntity } from '../lib/utils';
import { MemberManagementEntity, WorkforceEntity } from '../types/api';

/**
 * 유저 부트스트랩
 * @returns 유저 정보, 구매한 모듈, 사이드바 메뉴 정보
 */
export const useUserBootstrap = () => {
  const { user } = useAuthenticator();

  const fetchLoginUserQuery = useQuery({
    queryKey: ['fetchLoginUser', user.userId],
    queryFn: () => fetchLoginUser(user.userId),
    enabled: !!user,
  });

  const fetchPurchasedModulesQuery = useQuery({
    queryKey: ['fetchPurchasedModules', fetchLoginUserQuery.data?.companyId],
    queryFn: () => fetchPurchasedModules(fetchLoginUserQuery.data?.companyId),
    enabled: !!fetchLoginUserQuery.data?.companyId,
  });

  const fetchModulesQuery = useQuery({
    queryKey: ['fetchModules', fetchPurchasedModulesQuery.data],
    queryFn: () => fetchModules(fetchPurchasedModulesQuery.data),
    enabled: !!fetchPurchasedModulesQuery.data,
  });

  //
  const fetchModuleInstanceQuery = useQuery({
    queryKey: [
      'fetchModuleInstance',
      fetchPurchasedModulesQuery.data,
      fetchModulesQuery.data,
    ],
    queryFn: () =>
      fetchModuleInstance(
        fetchPurchasedModulesQuery.data,
        fetchModulesQuery.data,
      ),
    enabled: !!fetchModulesQuery.data,
  });

  // Modules
  function memberManagementModule(): MemberManagementEntity | undefined {
    if (
      isMemberManagementEntity(
        'memberManagement',
        fetchModuleInstanceQuery.data?.memberManagement,
      )
    ) {
      return fetchModuleInstanceQuery.data?.memberManagement;
    }

    return;
  }

  function workforceModule(): WorkforceEntity | undefined {
    if (
      isWorkforceEntity('workforce', fetchModuleInstanceQuery.data?.workforce)
    ) {
      return fetchModuleInstanceQuery.data?.workforce;
    }

    return;
  }

  return {
    fetchLoginUserQuery,
    fetchPurchasedModulesQuery,
    fetchModulesQuery,
    fetchModuleInstanceQuery,
    //
    memberManagementModule,
    workforceModule,
  };
};
