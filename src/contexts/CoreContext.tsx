import { createContext, useContext } from 'react';

import {
  MembershipTableData,
  MemberTableData,
} from '@/types/member-management/views';
import { FetchPurchasedModule } from '@/types/responseTypes';

interface UserContextType {
  getPurchasedModules: (purchasedModules: FetchPurchasedModule[]) => void;
  purchasedModules: FetchPurchasedModule[];
  memberTableData: MemberTableData[];
  membershipTableData: MembershipTableData[];
}

export const CoreContext = createContext<UserContextType | undefined>(
  undefined,
);

// Required Definite Assignment Assertions(!)
export const useCoreContext = () => useContext(CoreContext)!;
