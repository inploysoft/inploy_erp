import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { FetchPurchasedModule } from '@/modules/member-management/types/api';
import {
  MembershipTableData,
  MemberTableData,
} from '@/modules/member-management/types/views';
import {
  getMemberList,
  getMembershipList,
} from '@/modules/member-management/utils/helpers';
import { InployModules } from '@/shared/types';
import { CoreContext } from './CoreContext';

export default function CoreProvider({ children }: { children: ReactNode }) {
  const [purchasedModules, setPurchasedModules] = useState<
    FetchPurchasedModule[]
  >([]);

  const [memberManagementInstanceId, setMemberManagementInstanceId] =
    useState<FetchPurchasedModule['moduleInstanceId']['id']>('');

  const [memberTableData, setMemberTableData] = useState<MemberTableData[]>([]);
  const [membershipTableData, setMembershipTableData] = useState<
    MembershipTableData[]
  >([]);

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
        setMemberManagementInstanceId(item.moduleInstanceId.id);

        console.log(
          getMemberList(
            item.moduleInstanceId.memberIds,
            item.moduleInstanceId.membershipRegistrationIds,
          ),
        );
        setMemberTableData(
          getMemberList(
            item.moduleInstanceId.memberIds,
            item.moduleInstanceId.membershipRegistrationIds,
          ),
        );

        setMembershipTableData(
          getMembershipList(item.moduleInstanceId.membershipIds),
        );
      }
    }
  }, [purchasedModules]);

  //
  const contextValue = useMemo(
    () => ({
      getPurchasedModules: getPurchasedModules,
      purchasedModules: purchasedModules,
      memberTableData: memberTableData,
      membershipTableData: membershipTableData,
      memberManagementInstanceId: memberManagementInstanceId,
    }),
    [
      getPurchasedModules,
      purchasedModules,
      memberTableData,
      membershipTableData,
      memberManagementInstanceId,
    ],
  );

  return (
    <CoreContext.Provider value={contextValue}>{children}</CoreContext.Provider>
  );
}
