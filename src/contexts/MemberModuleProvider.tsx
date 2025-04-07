import { ReactNode, useCallback, useMemo, useState } from 'react';

import { getMemberList } from '@/modules/member-management/helpers';
import { InployModules } from '@/types/global';
import { MemberTableData } from '@/types/member-management/views';
import { FetchPurchasedModule } from '@/types/responseTypes';
import { MemberModuleContext } from './MemberModuleContext';

export function MemberModuleProvider({ children }: { children: ReactNode }) {
  const [memberList, setMemberList] = useState<MemberTableData[]>([]);

  const getModuleSpecificData = useCallback(
    (purchasedModules: FetchPurchasedModule[]) => {
      for (const item of purchasedModules) {
        if (item.module.moduleType === InployModules.MemberManagement) {
          setMemberList(getMemberList(item.moduleInstanceId.memberIds));
        }
      }
    },
    [],
  );

  //
  const contextValue = useMemo(
    () => ({
      getModuleSpecificData: getModuleSpecificData,
      memberList: memberList,
    }),
    [getModuleSpecificData, memberList],
  );

  return (
    <MemberModuleContext.Provider value={contextValue}>
      {children}
    </MemberModuleContext.Provider>
  );
}
