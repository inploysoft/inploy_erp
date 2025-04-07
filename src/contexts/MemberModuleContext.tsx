import { createContext, useContext } from 'react';

import { MemberTableData } from '@/types/member-management/views';
import { FetchPurchasedModule } from '@/types/responseTypes';

interface MemberContextType {
  getModuleSpecificData: (purchasedModules: FetchPurchasedModule[]) => void;
  memberList: MemberTableData[];
}

export const MemberModuleContext = createContext<MemberContextType | undefined>(
  undefined,
);

// Required Definite Assignment Assertions(!)
export const useMemberModuleContext = () => useContext(MemberModuleContext)!;
