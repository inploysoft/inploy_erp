import { defineFunction } from '@aws-amplify/backend';

export const fetchPurchasedModules = defineFunction({
  name: 'fetchPurchasedModules',
  resourceGroupName: 'data',
});
