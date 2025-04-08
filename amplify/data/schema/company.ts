import { a } from '@aws-amplify/backend';

/* 회사 정보 */
export const CompanyModel = a.model({
  name: a.string().required(),
  //
  companyMemberIds: a.hasMany('CompanyMember', 'companyId'),
  purchasedModuleId: a.hasMany('PurchasedModule', 'companyId'),
});
