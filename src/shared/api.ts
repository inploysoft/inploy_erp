import { generateClient } from 'aws-amplify/data';
import { ConsoleLogger } from 'aws-amplify/utils';

import type { Schema } from '../../amplify/data/resource';
import {
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
): Promise<Schema['CompanyMember']['type'] | null> {
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
      return null;
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
): Promise<Schema['Company']['type'] | null> {
  try {
    if (!companyId) {
      return null;
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

    return data;
  } catch (error) {
    logger.error('Exceptional errors: ', error);
    throw new Error('fetchCompany: ' + error);
  }
}

//
export const fetchPurchasedModuleSelectionSet = [
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
  modules?: Schema['Module']['type'][],
): Promise<ModuleEntity | undefined> {
  try {
    if (
      !purchasedModules ||
      purchasedModules.length === 0 ||
      !modules ||
      modules.length === 0
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

    for (const module of modules) {
      const moduleType = module.moduleType as InployModule;

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

    return {
      ...memberManagementResult,
      ...workforceResult,
    };
  } catch (error) {
    logger.error('Exceptional errors: ', error);
    throw new Error('fetchModuleInstance: ' + error);
  }
}
