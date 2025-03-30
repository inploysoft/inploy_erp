import { a } from '@aws-amplify/backend';

// 회사가 구매한 모듈 정보
export const PurchasedModuleModel = a.model({
  status: a.enum(['purchased', 'activated', 'suspended']),
  purchasedAt: a.datetime(),
  fieldsConfiguredAt: a.datetime(),
  suspendedAt: a.datetime(),
  //
  companyId: a.id(),
  company: a.belongsTo('Company', 'companyId'),
  moduleId: a.id(),
  module: a.belongsTo('Module', 'moduleId'),
  entityFieldSchemaIds: a.hasMany('EntityFieldSchema', 'purchasedModuleId'),
});
