import { Nullable } from '../types/types';

export type ModuleType =
  | 'memberManagement'
  | 'salesManagement'
  | 'workforce'
  | 'scheduler';

export interface Module {
  id: string;
  dataLocation: Nullable<string>[];
  displayName: string;
  moduleType?: Nullable<string>; // 수정 필요
  updatedAt: string;
}
