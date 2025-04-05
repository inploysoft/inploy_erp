import { a } from '@aws-amplify/backend';

/* 실데이터 모델 정의 */

// 회원 정보
export const MemberModel = a.model({
  moduleInstanceId: a.id(),
  name: a.string(),
  birthDate: a.date(),
  customFields: a.json().array(), // [{ key: 'parking', value: true }]
  //
  moduleInstance: a.belongsTo('ModuleInstance', 'moduleInstanceId'),
});
