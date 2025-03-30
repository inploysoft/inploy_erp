import { a } from '@aws-amplify/backend';

export const CompanyModel = a.model({
  name: a.string().required(),
  //
  purchasedModuleId: a.hasMany('PurchasedModule', 'companyId'),
});

export const CompanyUserModel = a.model({
  name: a.string(),
  email: a.email().required(),
  isAdmin: a.boolean(), // TODO: 20250530 bool -> enum 변경
  //
  companyId: a.id(),
  company: a.belongsTo('Company', 'companyId'),
});

// 인플로이에서 제공하는 모듈 목록
export const ModuleModel = a.model({
  moduleType: a.string(),
  displayName: a.string(),
  dataLocation: a.string().array(), // ['Member', 'Locker']
});

// 회사가 구매한 모듈 정보
export const PurchasedModuleModel = a.model({
  status: a.enum(['purchased', 'activated', 'suspended']),
  purchasedAt: a.datetime(),
  fieldsConfiguredAt: a.datetime(),
  suspendedAt: a.datetime(),
  //
  companyId: a.id(),
  company: a.belongsTo('Company', 'companyId'),
  moduleId: a.id(),
  module: a.belongsTo('Module', 'moduleId'),
  entityFieldSchemaIds: a.hasMany('EntityFieldSchema', 'purchasedModuleId'),
});

// 커스텀 필드 스키마 정의 (모듈별 기능 단위로)
export const EntityFieldSchemaModel = a.model({
  entity: a.string(), // 'Member'
  schema: a.json().array(), // [{ key: 'parking', type: 'bool' }]
  //
  purchasedModuleId: a.id(),
  purchasedModule: a.belongsTo('PurchasedModule', 'purchasedModuleId'),
});

// 실데이터
export const MemberModel = a.model({
  name: a.string(),
  birthDate: a.date(),
  customFields: a.json().array(), // [{ key: 'parking', value: true }]
  //
  companyId: a.id(),
  company: a.belongsTo('Company', 'companyId'),
});
