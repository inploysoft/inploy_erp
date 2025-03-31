import { a } from '@aws-amplify/backend';

/* 모듈 운영(실데이터) 정보 */
export const ModuleInstanceModel = a.model({
  purchasedModuleId: a.id(),
  status: a.enum(['activated', 'suspended']),
  activatedAt: a.datetime(),
  suspendedAt: a.datetime(),
  //
  purchasedModule: a.belongsTo('PurchasedModule', 'purchasedModuleId'),
  entityFieldSchemaIds: a.hasMany('EntityFieldSchema', 'moduleInstanceId'),
  memberId: a.hasOne('Member', 'moduleInstanceId'),
});
