import { createContext, useContext } from 'react';

import { MemberTableData } from '@/types/member-management/views';
import { FetchPurchasedModule } from '@/types/responseTypes';

interface UserContextType {
  getPurchasedModules: (purchasedModules: FetchPurchasedModule[]) => void;
  purchasedModules: FetchPurchasedModule[];
  memberTableData: MemberTableData[];
}

export const CoreContext = createContext<UserContextType | undefined>(
  undefined,
);

// Required Definite Assignment Assertions(!)
export const useCoreContext = () => useContext(CoreContext)!;
