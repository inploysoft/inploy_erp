import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { getMemberList } from '@/modules/member-management/helpers';
import { InployModules } from '@/types/global';
import { MemberTableData } from '@/types/member-management/views';
import { FetchPurchasedModule } from '@/types/responseTypes';
import { CoreContext } from './CoreContext';

export default function CoreProvider({ children }: { children: ReactNode }) {
  const [purchasedModules, setPurchasedModules] = useState<
    FetchPurchasedModule[]
  >([]);

  const [memberTableData, setMemberTableData] = useState<MemberTableData[]>([]);

  const getPurchasedModules = useCallback(
    (purchasedModules: FetchPurchasedModule[]) => {
      setPurchasedModules(purchasedModules);
    },
    [],
  );

  // TODO: 20250406 상태관리 라이브러리로 변경
  useEffect(() => {
    for (const item of purchasedModules) {
      if (item.module.moduleType === InployModules.MemberManagement) {
        setMemberTableData(getMemberList(item.moduleInstanceId.memberIds));
      }
    }
  }, [purchasedModules]);

  //
  const contextValue = useMemo(
    () => ({
      getPurchasedModules: getPurchasedModules,
      purchasedModules: purchasedModules,
      memberTableData: memberTableData,
    }),
    [getPurchasedModules, purchasedModules, memberTableData],
  );

  return (
    <CoreContext.Provider value={contextValue}>{children}</CoreContext.Provider>
  );
}
