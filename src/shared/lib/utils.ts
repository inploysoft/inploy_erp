import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { MemberManagementEntity, WorkforceEntity } from '../types/api';
import { InployModule } from '../types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//
export function isMemberManagementEntity(
  type: Extract<InployModule, 'memberManagement'>,
  module?: MemberManagementEntity | WorkforceEntity,
): module is MemberManagementEntity {
  return module?.type == type;
}

export function isWorkforceEntity(
  type: Extract<InployModule, 'workforce'>,
  module?: MemberManagementEntity | WorkforceEntity,
): module is WorkforceEntity {
  return module?.type == type;
}
