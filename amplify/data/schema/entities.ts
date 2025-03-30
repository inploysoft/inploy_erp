import { a } from '@aws-amplify/backend';

/* 실데이터 모델 정의 */
export const MemberModel = a.model({
  name: a.string(),
  birthDate: a.date(),
  customFields: a.json().array(), // [{ key: 'parking', value: true }]
  //
  companyId: a.id(),
  company: a.belongsTo('Company', 'companyId'),
});
