import { a } from '@aws-amplify/backend';

/* 커스텀 필드 스키마 정의 (모듈별 기능 단위로) */
export const EntityFieldSchemaModel = a.model({
  moduleInstanceId: a.id(),
  entity: a.string().required(), // 'Member'
  schema: a.json().array(), // [{ key: 'parking', type: 'bool' }]
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
});
