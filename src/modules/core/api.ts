import { generateClient } from 'aws-amplify/data';
import { ConsoleLogger } from 'aws-amplify/utils';
import type { Schema } from '../../../amplify/data/resource';

import { Module } from '@/shared/models/module';
import { useUserBootstrap } from '@/shared/hooks/useUserBootstrap';

const client = generateClient<Schema>();

const logger = new ConsoleLogger('API');

export async function fetchModules(): Promise<
  Schema['Module']['type'][] | undefined
> {
  try {
    const { data, errors } = await client.models.Module.list({
      authMode: 'userPool',
    });

    if (errors) {
      logger.error('fetchModules: ', errors);
      return;
    }

    return data;
  } catch (error) {
    logger.error('Unexpected Errors: ', error);
  }
}

export async function createPurchasedModules(
  modules: Module[],
  loginedUser: Schema['CompanyMember']['type'] | undefined,
): Promise<Schema['PurchasedModule']['type'][] | undefined> {
  if (modules.length === 0) {
    logger.error('createPurchasedModules: Empty purchasedModules');
  }

  if (!loginedUser) {
    logger.error('createPurchasedModules: No loginedUser information provided');
  }

  const result: Schema['PurchasedModule']['type'][] = [];

  try {
    for (const module of modules) {
      const { data, errors } = await client.models.PurchasedModule.create(
        {
          companyId: loginedUser?.companyId,
          moduleId: module.id,
          status: 'purchased',
          purchasedAt: new Date().toISOString(),
        },
        {
          authMode: 'userPool',
        },
      );

      if (errors) {
        logger.error('createPurchasedModules: ', errors);
        return;
      }

      result.push(data as Schema['PurchasedModule']['type']);
    }

    return result;
  } catch (error) {
    logger.error('Unexpected Errors: ', error);
  }
}
