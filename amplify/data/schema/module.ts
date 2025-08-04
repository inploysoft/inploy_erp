import { a } from '@aws-amplify/backend';

const moduleTypes = [
  'memberManagement',
  'salesManagement',
  'workforce',
  'scheduler',
];

/* 인플로이 제공 모듈 */
export const ModuleModel = a.model({
  moduleType: a.enum(moduleTypes),
  displayName: a.string().required(),
  dataLocation: a.string().array().required(), // ['Member', 'Locker']
  //
  purchasedModuleIds: a.hasMany('PurchasedModule', 'moduleId'),
});
