import { a } from '@aws-amplify/backend';

/* 실데이터 모델 정의 */

// 회원 정보
export const MemberModel = a.model({
  moduleInstanceId: a.id(),
  name: a.string().required(),
  phone: a.phone().required(),
  gender: a.string(),
  birthDate: a.date(),
  customFields: a.json().array(), // [{ key: 'parking', value: true }]
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  membershipIds: a.hasMany('Membership', 'memberId'),
});

// 이용권 정보
export const MembershipModel = a.model({
  moduleInstanceId: a.id(),
  memberId: a.id(),
  membershipType: a.string().required(),
  name: a.string().required(),
  months: a.integer(),
  counts: a.integer(),
  registerType: a.enum(['count', 'monthly']),
  price: a.integer(),
  status: a.enum(['valid', 'expired']),
  customFields: a.json().array(),
  registeredAt: a.datetime().required(),
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  member: a.belongsTo('Member', 'memberId'),
});
