import { a } from '@aws-amplify/backend';

/* 모듈 운영(실데이터) 정보 */
export const ModuleInstanceModel = a.model({
  purchasedModuleId: a.id(),
  status: a.enum(['inactive', 'activated', 'suspended', 'cancelled']),
  activatedAt: a.datetime(),
  suspendedAt: a.datetime(),
  //
  purchasedModule: a.belongsTo('PurchasedModule', 'purchasedModuleId'),
  entityFieldSchemaIds: a.hasMany('EntityFieldSchema', 'moduleInstanceId'),
  memberId: a.hasOne('Member', 'moduleInstanceId'),
});

/* status
- inactive: 필드 설정 전
- active: 필드 설정 후, 사용 중
- suspended: 사용 중지 (미납, 일시정지)
- cancelled: 구매 취소, 계약 종료
*/
