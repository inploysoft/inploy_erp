import { Amplify } from 'aws-amplify';

import { env } from '$amplify/env/fetchPurchasedModules';

import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { generateClient } from 'aws-amplify/api';

import { type Schema } from '../../data/resource';

const { resourceConfig, libraryOptions } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: Schema['fetchPurchasedModules']['functionHandler'] =
  async (event) => {
    const { sub } = event.arguments;

    if (!sub) {
      return null;
    }

    const { data: companyMember, errors: companyMemberErrors } =
      await client.models.CompanyMember.list({
        authMode: 'userPool',
        filter: {
          sub: { eq: sub },
        },
      });

    if (companyMemberErrors || !companyMember[0].companyId) {
      console.log('FetchUserError: ', companyMemberErrors);
      return null;
    }

    const { data: company, errors: companyErrors } =
      await client.models.Company.get(
        {
          id: companyMember[0].companyId,
        },
        {
          authMode: 'userPool',
        },
      );

    if (companyErrors || !company?.purchasedModuleId) {
      console.log('FetchUserError: ', companyErrors);
      return null;
    }

    const { data: purchasedModule, errors: purchasedModuleErrors } =
      await client.models.PurchasedModule.list({
        authMode: 'userPool',
        filter: {
          companyId: { eq: companyMember[0].companyId! },
        },
        selectionSet: [
          'id',
          'company.name',
          'status',
          'module.*',
          'moduleInstanceId.status',
          'moduleInstanceId.entityFieldSchemaIds.*',
          'moduleInstanceId.memberIds.*',
        ],
      });

    if (purchasedModuleErrors) {
      console.log('FetchUserError: ', purchasedModuleErrors);
      return null;
    }

    return purchasedModule;
  };
