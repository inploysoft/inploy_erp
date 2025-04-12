import { a } from '@aws-amplify/backend';

/* 실데이터 모델 정의 */

// 회원 정보
export const MemberModel = a.model({
  moduleInstanceId: a.id(),
  name: a.string().required(),
  phone: a.phone().required(),
  gender: a.string(),
  birthDate: a.date(),
  registeredAt: a.datetime(),
  customFields: a.json().array(), // [{ key: 'parking', value: true }]
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  membershipRegistrationIds: a.hasMany('MembershipRegistration', 'memberId'),
});

// 이용권 정보
export const MembershipModel = a.model({
  moduleInstanceId: a.id(),
  registerType: a.enum(['duration', 'count']),
  displayName: a.string().required(),
  durationValue: a.integer(),
  durationUnit: a.enum(['minute', 'hour', 'day', 'month']),
  sessionCount: a.integer(),
  price: a.integer().required(),
  customFields: a.json().array(),
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  membershipRegistrationIds: a.hasMany(
    'MembershipRegistration',
    'membershipId',
  ),
});

// 이용권 등록 정보
export const MembershipRegistrationModel = a.model({
  moduleInstanceId: a.id(),
  memberId: a.id(),
  membershipId: a.id(),
  status: a.enum(['valid', 'expired']),
  usedSessionCount: a.integer().default(0),
  registeredAt: a.datetime().required(),
  expiredAt: a.datetime(),
  customFields: a.json().array(),
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  member: a.belongsTo('Member', 'memberId'),
  membership: a.belongsTo('Membership', 'membershipId'),
});
