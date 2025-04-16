import { Nullable } from '@/shared/types/types';

export type ModuleInstanceStatus =
  | 'inactive'
  | 'activated'
  | 'suspended'
  | 'cancelled';

export interface ModuleInstance {
  purchaseModuleId: Nullable<string>;
  id: string;
  //
  status: Nullable<ModuleInstanceStatus>;
  activatedAt: Nullable<string>;
  suspendedAt: Nullable<string>;
  createdAt: string;
  updatedAt: string;
}
