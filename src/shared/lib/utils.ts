import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  MemberManagementEntity,
  ModuleEntity,
  ModuleEntityGeneric,
  WorkforceEntity,
} from '../types/api';
import { InployModule } from '../types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//
export function isMemberManagementEntity(
  module: MemberManagementEntity | WorkforceEntity,
  type: Extract<InployModule, 'memberManagement'>,
): module is MemberManagementEntity {
  return module.type == type;
}

export function isWorkforceEntity(
  module: ModuleEntity,
  type: Extract<InployModule, 'workforce'>,
): module is ModuleEntityGeneric<WorkforceEntity> {
  return module.workforce.type == type;
}
