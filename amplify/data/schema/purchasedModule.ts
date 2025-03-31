import { a } from '@aws-amplify/backend';

/* 모듈 구매 정보 */
export const PurchasedModuleModel = a.model({
  companyId: a.id(),
  moduleId: a.id(),
  status: a.enum(['purchased', 'cancelled']),
  purchasedAt: a.datetime(),
  cancelledAt: a.datetime(),
  //
  company: a.belongsTo('Company', 'companyId'),
  module: a.belongsTo('Module', 'moduleId'),
  moduleInstanceIds: a.hasOne('ModuleInstance', 'purchasedModuleId'),
});
