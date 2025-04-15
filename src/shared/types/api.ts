import { SelectionSet } from 'aws-amplify/api';

import { Schema } from '../../../amplify/data/resource';
import {
  defaultSet,
  fetchPurchasedModuleSelectionSet,
  memberManagementSet,
  workforceSet,
} from '../api';
import { InployModule } from './types';

export type FetchPurchasedModule2 = SelectionSet<
  Schema['PurchasedModule']['type'],
  typeof fetchPurchasedModuleSelectionSet
>;

//
export type ModuleInstanceBase = SelectionSet<
  Schema['ModuleInstance']['type'],
  typeof defaultSet
> & {
  type: InployModule;
};

export type MemberManagementEntity = SelectionSet<
  Schema['ModuleInstance']['type'],
  typeof memberManagementSet
> &
  ModuleInstanceBase;

export type WorkforceEntity = SelectionSet<
  Schema['ModuleInstance']['type'],
  typeof workforceSet
> &
  ModuleInstanceBase;

export type ModuleEntity = Record<
  InployModule,
  MemberManagementEntity | WorkforceEntity
>;

export type ModuleEntityGeneric<TData> = Record<InployModule, TData>;
