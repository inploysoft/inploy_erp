import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from 'aws-amplify/auth';
import { useMemo } from 'react';
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
  const awsGetCurrentUserQuery = useQuery({
    queryKey: ['awsGetCurrentUser'],
    queryFn: () => getCurrentUser(),
  });

  const fetchLoginUserQuery = useQuery({
    queryKey: ['fetchLoginUser', awsGetCurrentUserQuery.data?.userId],
    queryFn: () => fetchLoginUser(awsGetCurrentUserQuery.data?.userId),
    enabled: !!awsGetCurrentUserQuery.data?.userId,
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

  // TODO 20250418 zod를 이용한 스키마 검증으로 변경
  const memberManagementModule: MemberManagementEntity | undefined =
    useMemo(() => {
      if (
        isMemberManagementEntity(
          'memberManagement',
          fetchModuleInstanceQuery.data?.memberManagement,
        )
      ) {
        return fetchModuleInstanceQuery.data?.memberManagement;
      }

      return;
    }, [fetchModuleInstanceQuery.data]);

  const workforceModule: WorkforceEntity | undefined = useMemo(() => {
    if (
      isWorkforceEntity('workforce', fetchModuleInstanceQuery.data?.workforce)
    ) {
      return fetchModuleInstanceQuery.data?.workforce;
    }

    return;
  }, [fetchModuleInstanceQuery.data]);

  return {
    awsGetCurrentUserQuery,
    fetchLoginUserQuery,
    fetchPurchasedModulesQuery,
    fetchModulesQuery,
    fetchModuleInstanceQuery,
    //
    memberManagementModule,
    workforceModule,
  };
};
