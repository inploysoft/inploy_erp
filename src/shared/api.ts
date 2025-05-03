import { generateClient } from 'aws-amplify/data';

import { Member } from '@/modules/member-management/models/member';
import type { Schema } from '../../amplify/data/resource';
import { awsLogger } from './lib/config';
import {
  FetchMemberWithRelations,
  FetchPurchasedModule,
  FetchPurchasedModuleWithModuleInstance,
  MemberManagementEntity,
  ModuleEntity,
  WorkforceEntity,
} from './types/api';
import { InployModule } from './types/types';

const client = generateClient<Schema>();

/**
 * 로그인 유저 정보 조회
 * @param user
 * @returns 로그인 유저 정보
 */
export async function fetchLoginUser(
  userId?: string,
): Promise<Schema['CompanyMember']['type'] | undefined> {
  try {
    const { data, errors } = await client.models.CompanyMember.list({
      filter: {
        sub: {
          eq: userId,
        },
      },
      authMode: 'userPool',
    });

    if (errors && errors.length > 0) {
      awsLogger.error('GraphQL errors: ', errors);
      throw new Error('fetchLoginUser: ' + errors);
    }

    if (!data || data.length === 0) {
      return;
    }

    return data[0];
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('fetchLoginUser: ' + error);
  }
}

/**
 * 회사 정보 조회
 * @param companyId
 * @returns 회사 정보
 */
export async function fetchCompany(
  companyId?: string | null,
): Promise<Schema['Company']['type'] | undefined> {
  try {
    if (!companyId) {
      return;
    }

    const { data, errors } = await client.models.Company.get(
      {
        id: companyId,
      },
      {
        authMode: 'userPool',
      },
    );

    if (errors && errors.length > 0) {
      awsLogger.error('GraphQL errors: ', errors);
      throw new Error('fetchCompany: ' + errors);
    }

    if (!data) {
      return;
    }

    return data;
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('fetchCompany: ' + error);
  }
}

//
export const fetchPurchasedModuleSelectionSet = [
  'id',
  'moduleId',
  'status',
  'purchasedAt',
  'cancelledAt',
  'expiredAt',
  'refundedAt',
  'moduleInstanceId.id',
] as const;

/**
 * 유저가 구매한 모듈 조회
 * @param companyId
 * @returns 구매한 모듈 정보
 */
export async function fetchPurchasedModules(
  companyId?: string | null,
): Promise<FetchPurchasedModule[]> {
  try {
    if (!companyId) {
      awsLogger.error('companyId is required');
      return [];
    }

    const { data, errors } = await client.models.PurchasedModule.list({
      filter: {
        companyId: {
          eq: companyId,
        },
      },
      selectionSet: fetchPurchasedModuleSelectionSet,
      authMode: 'userPool',
    });

    if (errors && errors.length > 0) {
      awsLogger.error('GraphQL errors: ', errors);
      throw new Error('fetchPurchasedModules: ' + errors);
    }

    return data;
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('fetchPurchasedModules: ' + error);
  }
}

/**
 * 실제 모듈에 대한 설명 정보 조회
 * @param purchasedModules
 * @returns 실제 모듈에 대한 설명 정보
 */
export async function fetchModules(
  purchasedModules?: FetchPurchasedModule[],
): Promise<Schema['Module']['type'][]> {
  try {
    if (!purchasedModules) {
      return [];
    }

    const { data, errors } = await client.models.Module.list({
      filter: {
        or: purchasedModules.map((value) => ({
          id: {
            eq: value.moduleId!,
          },
        })),
      },
      authMode: 'userPool',
    });

    if (errors && errors.length > 0) {
      awsLogger.error('GraphQL errors: ', errors);
    }

    return data;
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('fetchModules: ' + error);
  }
}

//
export const fetchPurchasedModuleWithModuleInstanceSet = ['module.*'] as const;

/**
 * 구매한 모듈 조회
 * @param purchasedModule 구매한 모듈
 * @returns 구매한 모듈 조회
 */
export async function fetchPurchasedModule(
  purchasedModule: FetchPurchasedModule,
): Promise<FetchPurchasedModuleWithModuleInstance | undefined> {
  try {
    const { data, errors } = await client.models.PurchasedModule.get(
      {
        id: purchasedModule.id,
      },
      {
        selectionSet: fetchPurchasedModuleWithModuleInstanceSet,
        authMode: 'userPool',
      },
    );

    if (errors && errors.length > 0) {
      awsLogger.error('GraphQL errors: ', errors);
      throw new Error('fetchPurchasedModulesWithModuleInstance: ' + errors);
    }

    if (!data) {
      awsLogger.error('fetchPurchasedModulesWithModuleInstance: ', data);
      return;
    }

    return data;
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('fetchPurchasedModulesWithModuleInstance: ' + error);
  }
}

//
export const defaultSet = ['id', 'status'] as const;

export const memberManagementSet = [
  'memberIds.*',
  'membershipTypeIds.*',
  'membershipPlanIds.*',
  'membershipRegistrationIds.*',
] as const;

export const workforceSet = ['trainerIds.*'] as const;
export const schedulerSet = ['trainerIds.*'] as const;

const selectionSetMap = {
  memberManagement: memberManagementSet,
  workforce: workforceSet,
  scheduler: schedulerSet,
} as const;

/**
 * 구매한 모듈 인스턴스 조회
 * @param purchasedModules 구매한 모듈
 * @param inployModules 인플로이 제공 모듈
 * @returns 구매한 모듈 인스턴스 조회
 */
export async function fetchModuleInstance(
  purchasedModules?: FetchPurchasedModule[],
  inployModules?: Schema['Module']['type'][],
): Promise<ModuleEntity | undefined> {
  try {
    if (
      !purchasedModules ||
      purchasedModules.length === 0 ||
      !inployModules ||
      inployModules.length === 0
    ) {
      awsLogger.error('fetchModuleInstance: ' + 'No parameters');
      return;
    }

    const memberManagementResult = {} as Record<
      Extract<InployModule, 'memberManagement'>,
      MemberManagementEntity
    >;

    const workforceResult = {} as Record<
      Extract<InployModule, 'workforce'>,
      WorkforceEntity
    >;

    // TODO: 20250419 구매한 모듈 한번에 가져오기
    for (const purchasedModule of purchasedModules) {
      const purchased = await fetchPurchasedModule(purchasedModule);

      const moduleType = purchased?.module.moduleType as InployModule;

      const moduleSet = selectionSetMap[moduleType];

      // lazy loading resolver
      const moduleInstanceIdFilters = (
        await Promise.all(
          purchasedModules.map(async (value) => {
            const instance = value.moduleInstanceId;
            return instance?.id ? { id: { eq: instance.id } } : null;
          }),
        )
      ).filter((f): f is { id: { eq: string } } => f !== null);

      const { data, errors } = await client.models.ModuleInstance.list({
        filter: {
          id: {
            eq: purchasedModule.moduleInstanceId?.id,
          },
          or: moduleInstanceIdFilters,
        },
        selectionSet: [...defaultSet, ...moduleSet],
        authMode: 'userPool',
      });

      if (errors && errors.length > 0) {
        awsLogger.error('GraphQL errors: ', errors);
        throw new Error('fetchModuleInstance: ' + errors);
      }

      if (!data || data.length === 0) {
        awsLogger.error('fetchModuleInstance: ', data);
        continue;
      }

      const result = {
        type: moduleType,
        ...data[0],
      };

      if (moduleType === 'memberManagement') {
        memberManagementResult['memberManagement'] = result;
      }

      if (moduleType === 'workforce') {
        workforceResult['workforce'] = result;
      }
    }

    return {
      ...memberManagementResult,
      ...workforceResult,
    };
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('fetchModuleInstance: ' + error);
  }
}

//
export const fetchMemberWithRelationsSet = [
  'id',
  'name',
  'phone',
  'gender',
  'birthDate',
  'address',
  'memo',
  'lastVisitedAt',
  'registeredAt',
  'customFields',
  'membershipRegistrationIds.*',
  'membershipRegistrationIds.membershipPlan.*',
  'membershipRegistrationIds.membershipPlan.membershipType.*',
  'membershipRegistrationIds.trainer.*',
] as const;

/**
 * 회원 테이블에 사용되는 회원 정보 조회
 * @description Member + MembershipRegistration 테이블 조회
 * @param member
 * @returns 회원 및 정보 조회
 */
export async function fetchMemberWithRelations(
  member: Member[],
): Promise<FetchMemberWithRelations[] | undefined> {
  try {
    const { data, errors } = await client.models.Member.list({
      filter: {
        or: member.map((value) => ({
          id: {
            eq: value.id,
          },
        })),
      },
      selectionSet: fetchMemberWithRelationsSet,
      authMode: 'userPool',
    });

    if (errors && errors.length > 0) {
      awsLogger.error('GraphQL errors: ', errors);
      throw new Error('fetchMemberWithRelations: ' + errors);
    }

    if (!data || data.length === 0) {
      return;
    }

    return data;
  } catch (error) {
    awsLogger.error('Exceptional errors: ', error);
    throw new Error('fetchMemberWithRelations: ' + error);
  }
}
