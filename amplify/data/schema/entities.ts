import { a } from '@aws-amplify/backend';

/* 실데이터 모델 정의 */

// 회원 정보
export const MemberModel = a.model({
  moduleInstanceId: a.id(),
  name: a.string(),
  gender: a.string(),
  birthDate: a.date(),
  customFields: a.json().array(), // [{ key: 'parking', value: true }]
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
});

// 이용권 정보
export const SessionModel = a.model({
  moduleInstanceId: a.id(),
  sessionType: a.string(),
  name: a.string(),
  months: a.integer(),
  registerType: a.enum(['count', 'months']),
  price: a.integer(),
  status: a.enum(['valid', 'expired']),
  customFields: a.json().array(),
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
});
