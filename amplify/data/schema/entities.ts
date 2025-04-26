import { a } from '@aws-amplify/backend';

/* 실데이터 모델 정의 */

// 회원 정보
export const MemberModel = a.model({
  moduleInstanceId: a.id(),
  name: a.string().required(),
  phone: a.phone().required(),
  gender: a.string(),
  birthDate: a.date(),
  address: a.string(),
  memo: a.string(),
  lastVisitedAt: a.date(),
  registeredAt: a.datetime(),
  customFields: a.json().array(), // [{ key: 'parking', value: true }]
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  membershipRegistrationIds: a.hasMany('MembershipRegistration', 'memberId'),
});

// 이용권 종류
export const MembershipTypeModel = a.model({
  moduleInstanceId: a.id(),
  displayName: a.string().required(),
  isActive: a.boolean().default(true),
  description: a.string(),
  customFields: a.json().array(),
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  membershipPlan: a.hasMany('MembershipPlan', 'membershipTypeId'),
});

// 이용권 옵션
export const MembershipPlanModel = a.model({
  moduleInstanceId: a.id(),
  membershipTypeId: a.id(),
  durationValue: a.integer(),
  durationUnit: a.enum(['none', 'minute', 'hour', 'day', 'month']),
  sessionCount: a.integer(),
  price: a.integer().required(),
  customFields: a.json().array(),
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  membershipType: a.belongsTo('MembershipType', 'membershipTypeId'),
  membershipRegistrationIds: a.hasMany(
    'MembershipRegistration',
    'membershipPlanId',
  ),
});

// 실제 구매 이용권 정보
export const MembershipRegistrationModel = a.model({
  moduleInstanceId: a.id(),
  memberId: a.id(),
  membershipPlanId: a.id(),
  trainerId: a.id(),
  status: a.enum(['valid', 'expired']),
  usedSessionCount: a.integer().default(0),
  registeredAt: a.datetime().required(),
  expiredAt: a.datetime(),
  customFields: a.json().array(),
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  member: a.belongsTo('Member', 'memberId'),
  membershipPlan: a.belongsTo('MembershipPlan', 'membershipPlanId'),
  trainer: a.belongsTo('Trainer', 'trainerId'),
});

// 트레이너 정보
export const TrainerModel = a.model({
  moduleInstanceId: a.id(),
  sub: a.id().required(),
  name: a.string().required(),
  phone: a.phone(),
  team: a.string(),
  customFields: a.json().array(),
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
  membershipRegistrationIds: a.hasMany('MembershipRegistration', 'trainerId'),
});
