import { a } from '@aws-amplify/backend';

/* 회사 소속 사용자 (실사용자) */
// TODO: 20250530 isAdmin: bool -> enum 변경
export const CompanyMemberModel = a.model({
  companyId: a.id(),
  sub: a.id().required(),
  name: a.string().required(),
  email: a.email().required(),
  phone: a.phone().required(), // +821012345678
  rank: a.string(),
  position: a.string(),
  isAdmin: a.boolean().default(false),
  joinedAt: a.date().required(),
  //
  company: a.belongsTo('Company', 'companyId'),
});
