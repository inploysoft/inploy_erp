import { a } from '@aws-amplify/backend';

export const CompanyModel = a.model({
  name: a.string().required(),
  //
  companyUserIds: a.hasMany('CompanyUser', 'companyId'),
  purchasedModuleId: a.hasMany('PurchasedModule', 'companyId'),
  memberId: a.hasOne('Member', 'companyId'),
});
