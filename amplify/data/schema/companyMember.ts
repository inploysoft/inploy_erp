import { a } from '@aws-amplify/backend';

/* 회사 소속 사용자 (실사용자) */
// TODO: 20250530 isAdmin: bool -> enum 변경
export const CompanyMemberModel = a.model({
  sub: a.id().required(),
  companyId: a.id(),
  name: a.string().required(),
  email: a.email().required(),
  phone: a.phone().required(), // +821012345678
  isAdmin: a.boolean().default(false),
  //
  company: a.belongsTo('Company', 'companyId'),
});
