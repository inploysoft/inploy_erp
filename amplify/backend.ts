import { defineBackend } from '@aws-amplify/backend';

import { auth } from './auth/resource';
import { data } from './data/resource';
import { fetchPurchasedModules } from './functions/fetchPurchasedModules/resource';
import { parseExcel } from './functions/parseExcel/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
  fetchPurchasedModules,
  parseExcel,
});
