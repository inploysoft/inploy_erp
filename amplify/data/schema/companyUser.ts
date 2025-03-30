import { a } from '@aws-amplify/backend';

/* 회사 소속 사용자 (실사용자) */
// TODO: 20250530 isAdmin: bool -> enum 변경
export const CompanyUserModel = a.model({
  name: a.string(),
  email: a.email().required(),
  isAdmin: a.boolean(),
  //
  companyId: a.id(),
  company: a.belongsTo('Company', 'companyId'),
});
