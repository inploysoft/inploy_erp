import { defineFunction } from '@aws-amplify/backend';

export const fetchPurchasedModules = defineFunction({
  name: 'fetchPurchasedModules',
  environment: {
    AMPLIFY_DATA_DEFAULT_NAME: 'fetchPurchasedModules',
  },
  resourceGroupName: 'data',
});
