import { generateClient } from 'aws-amplify/data';
import { ConsoleLogger } from 'aws-amplify/utils';

import type { Schema } from '../../amplify/data/resource';
import { FetchPurchasedModule2 } from './types/api';

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
    // 4. 네트워크/예외 오류 처리
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
 * 구매한 모듈 조회
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
