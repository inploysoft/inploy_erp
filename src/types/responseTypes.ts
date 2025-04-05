import { SelectionSet } from 'aws-amplify/api';
import { type Schema } from '../../amplify/data/resource';

export const selectionSet = [
  'id',
  'company.id',
  'company.name',
  'status',
  'module.*',
  'moduleInstanceId.status',
  'moduleInstanceId.entityFieldSchemaIds.*',
  'moduleInstanceId.memberId.*',
] as const;

export type FetchPurchasedModule = SelectionSet<
  Schema['PurchasedModule']['type'],
  typeof selectionSet
>;
