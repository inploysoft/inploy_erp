import { createContext, useContext } from 'react';

import { FetchPurchasedModule } from '@/modules/member-management/types/api';
import {
  MembershipTableData,
  MemberTableData,
} from '@/modules/member-management/types/views';
interface UserContextType {
  getPurchasedModules: (purchasedModules: FetchPurchasedModule[]) => void;
  purchasedModules: FetchPurchasedModule[];
  memberTableData: MemberTableData[];
  membershipTableData: MembershipTableData[];
  memberManagementInstanceId: FetchPurchasedModule['moduleInstanceId']['id'];
}

export const CoreContext = createContext<UserContextType | undefined>(
  undefined,
);

// Required Definite Assignment Assertions(!)
export const useCoreContext = () => useContext(CoreContext)!;
