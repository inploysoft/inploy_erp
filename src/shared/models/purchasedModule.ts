export type PurchasedModuleStatus =
  | 'pending'
  | 'purchased'
  | 'cancelled'
  | 'expired'
  | 'refunded';

export interface PurchasedModule {
  companyId: string;
  moduleId: string;
  status: PurchasedModuleStatus;
  purchasedAt: string;
  cancelledAt: string;
  expiredAt: string;
  refundedAt: string;
}
