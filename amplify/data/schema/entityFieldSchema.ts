import { a } from '@aws-amplify/backend';

/* 커스텀 필드 스키마 정의 (모듈별 기능 단위로) */
export const EntityFieldSchemaModel = a.model({
  entity: a.string(), // 'Member'
  schema: a.json().array(), // [{ key: 'parking', type: 'bool' }]
  //
  purchasedModuleId: a.id(),
  purchasedModule: a.belongsTo('PurchasedModule', 'purchasedModuleId'),
});
