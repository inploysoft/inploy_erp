import { defineBackend } from '@aws-amplify/backend';

import { auth } from './auth/resource';
import { data } from './data/resource';
import { fetchPurchasedModules } from './functions/fetchPurchasedModules/resource';
import { parseComplexField } from './functions/parseComplexField/resource';
import { parseExcelToJson } from './functions/parseExcelToJson/resource';
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  fetchPurchasedModules,
  parseExcelToJson,
  parseComplexField,
});

// Enabling deletion protection on a Auth resource
const { cfnUserPool } = backend.auth.resources.cfnResources;
cfnUserPool.deletionProtection = 'ACTIVE';
