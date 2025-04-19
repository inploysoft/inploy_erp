import { generateClient } from 'aws-amplify/data';
import { ConsoleLogger } from 'aws-amplify/utils';

import { Member } from '@/modules/member-management/models/member';
import type { Schema } from '../../amplify/data/resource';
import {
  FetchMemberWithRelations,
  FetchPurchasedModule2,
  MemberManagementEntity,
  ModuleEntity,
  WorkforceEntity,
} from './types/api';
import { InployModule } from './types/types';

const client = generateClient<Schema>();

const logger = new ConsoleLogger('API');

/**
 * 로그인 유저 정보 조회
 * @param user
 * @returns 로그인 유저 정보
 */
export async function fetchLoginUser(
  userId: string,
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
      logger.error('GraphQL errors: ', errors);
      throw new Error('fetchLoginUser: ' + errors);
    }

    if (!data || data.length === 0) {
      return;
    }

    return data[0];
  } catch (error) {
    logger.error('Exceptional errors: ', error);
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
      logger.error('GraphQL errors: ', errors);
      throw new Error('fetchCompany: ' + errors);
    }

    if (!data) {
      return;
    }

    return data;
  } catch (error) {
    logger.error('Exceptional errors: ', error);
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
): Promise<FetchPurchasedModule2[]> {
  try {
    if (!companyId) {
      logger.error('companyId is required');
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
      logger.error('GraphQL errors: ', errors);
      throw new Error('fetchPurchasedModules: ' + errors);
    }

    return data;
  } catch (error) {
    logger.error('Exceptional errors: ', error);
    throw new Error('fetchPurchasedModules: ' + error);
  }
}

/**
 * 실제 모듈에 대한 설명 정보 조회
 * @param purchasedModules
 * @returns 실제 모듈에 대한 설명 정보
 */
export async function fetchModules(
  purchasedModules?: FetchPurchasedModule2[],
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
      logger.error('GraphQL errors: ', errors);
      throw new Error('fetchModules: ' + errors);
    }

    return data;
  } catch (error) {
    logger.error('Exceptional errors: ', error);
    throw new Error('fetchModules: ' + error);
  }
}

//
export const defaultSet = ['id', 'status'] as const;

export const memberManagementSet = [
  'memberIds.*',
  'membershipIds.*',
  'membershipRegistrationIds.*',
] as const;

export const workforceSet = ['trainerIds.*'] as const;

const selectionSetMap = {
  memberManagement: memberManagementSet,
  workforce: workforceSet,
} as const;

export async function fetchModuleInstance(
  purchasedModules?: FetchPurchasedModule2[],
  inployModules?: Schema['Module']['type'][],
): Promise<ModuleEntity | undefined> {
  console.log('fetchModuleInstance', purchasedModules);
  try {
    if (
      !purchasedModules ||
      purchasedModules.length === 0 ||
      !inployModules ||
      inployModules.length === 0
    ) {
      logger.error('fetchModuleInstance: ' + 'No parameters');
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

    for (const purchasedModule of purchasedModules) {
      const { data: purchased, errors: purchasedErrors } =
        await client.models.PurchasedModule.get(
          {
            id: purchasedModule.id,
          },
          {
            selectionSet: ['module.*'],
            authMode: 'userPool',
          },
        );

      if (purchasedErrors && purchasedErrors.length > 0) {
        logger.error('GraphQL errors: ', purchasedErrors);
        throw new Error('fetchModuleInstance: ' + purchasedErrors);
      }

      if (!purchased) {
        logger.error('fetchModuleInstance: ', purchased);
        continue;
      }

      //
      const moduleType = purchased.module.moduleType as InployModule;

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
        logger.error('GraphQL errors: ', errors);
        throw new Error('fetchModuleInstance: ' + errors);
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

    console.log('memberManagementResult', memberManagementResult);
    console.log('workforceResult', workforceResult);

    // for (const module of inployModules) {
    //   const moduleType = module.moduleType as InployModule;

    //   const moduleSet = selectionSetMap[moduleType];

    //   // lazy loading resolver
    //   const moduleInstanceIdFilters = (
    //     await Promise.all(
    //       purchasedModules.map(async (value) => {
    //         const instance = value.moduleInstanceId;
    //         return instance?.id ? { id: { eq: instance.id } } : null;
    //       }),
    //     )
    //   ).filter((f): f is { id: { eq: string } } => f !== null);

    //   const { data, errors } = await client.models.ModuleInstance.list({
    //     filter: {
    //       or: moduleInstanceIdFilters,
    //     },
    //     selectionSet: [...defaultSet, ...moduleSet],
    //     authMode: 'userPool',
    //   });

    //   if (errors && errors.length > 0) {
    //     logger.error('GraphQL errors: ', errors);
    //     throw new Error('fetchModuleInstance: ' + errors);
    //   }

    //   const result = {
    //     type: moduleType,
    //     ...data[0],
    //   };

    //   console.log('result', result);

    //   if (moduleType === 'memberManagement') {
    //     memberManagementResult['memberManagement'] = result;
    //   }

    //   if (moduleType === 'workforce') {
    //     workforceResult['workforce'] = result;
    //   }
    // }

    return {
      ...memberManagementResult,
      ...workforceResult,
    };
  } catch (error) {
    logger.error('Exceptional errors: ', error);
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
  'registeredAt',
  'customFields',
  'membershipRegistrationIds.id',
  'membershipRegistrationIds.status',
  'membershipRegistrationIds.usedSessionCount',
  'membershipRegistrationIds.registeredAt',
  'membershipRegistrationIds.expiredAt',
  'membershipRegistrationIds.customFields',
  'membershipRegistrationIds.membership.*',
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
      logger.error('GraphQL errors: ', errors);
      throw new Error('fetchMemberWithRelations: ' + errors);
    }

    if (!data || data.length === 0) {
      return;
    }

    return data;
  } catch (error) {
    logger.error('Exceptional errors: ', error);
    throw new Error('fetchMemberWithRelations: ' + error);
  }
}
