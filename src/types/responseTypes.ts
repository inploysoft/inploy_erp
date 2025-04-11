import { SelectionSet } from 'aws-amplify/api';
import { type Schema } from '../../amplify/data/resource';

export const selectionSet = [
  'id',
  'company.id',
  'company.name',
  'status',
  'module.*',
  'moduleInstanceId.*',
  'moduleInstanceId.entityFieldSchemaIds.*',
  'moduleInstanceId.memberIds.*',
  'moduleInstanceId.membershipIds.*',
  'moduleInstanceId.membershipRegistrationIds.*',
] as const;

export type FetchPurchasedModule = SelectionSet<
  Schema['PurchasedModule']['type'],
  typeof selectionSet
>;
