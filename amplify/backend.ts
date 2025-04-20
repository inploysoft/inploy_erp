import { defineBackend } from '@aws-amplify/backend';

import { auth } from './auth/resource';
import { data } from './data/resource';
import { fetchPurchasedModules } from './functions/fetchPurchasedModules/resource';
import { parseExcelToJson } from './functions/parseExcelToJson/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
  fetchPurchasedModules,
  parseExcelToJson,
});
