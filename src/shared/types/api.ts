import { SelectionSet } from 'aws-amplify/api';

import { Schema } from '../../../amplify/data/resource';
import { fetchPurchasedModuleSelectionSet } from '../api';

export type FetchPurchasedModule2 = SelectionSet<
  Schema['PurchasedModule']['type'],
  typeof fetchPurchasedModuleSelectionSet
>;
