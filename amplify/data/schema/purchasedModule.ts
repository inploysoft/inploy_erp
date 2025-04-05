import { a } from '@aws-amplify/backend';

/* 모듈 구매 정보 */
export const PurchasedModuleModel = a.model({
  companyId: a.id(),
  moduleId: a.id(),
  status: a.enum(['pending', 'purchased', 'cancelled', 'expired', 'refunded']),
  purchasedAt: a.datetime(),
  cancelledAt: a.datetime(),
  //
  company: a.belongsTo('Company', 'companyId'),
  module: a.belongsTo('Module', 'moduleId'),
  moduleInstanceId: a.hasOne('ModuleInstance', 'purchasedModuleId'),
});

/* status
- pending	구매 요청 후 결제 확인 중	결제 API 연동 시 필요
- purchased	구매 완료	기본
- cancelled	구매 취소	기본
- expired	유효기간 만료 (정기결제, 기간제 상품 등)
- refunded	결제 취소, 환불 처리
*/
