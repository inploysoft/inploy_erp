import { a } from '@aws-amplify/backend';

const moduleTypes = ['member_management'];

// 인플로이에서 제공하는 모듈 목록
export const ModuleModel = a.model({
  moduleType: a.enum(moduleTypes),
  displayName: a.string(),
  dataLocation: a.string().array(), // ['Member', 'Locker']
  //
  purchasedModuleIds: a.hasMany('PurchasedModule', 'moduleId'),
});
