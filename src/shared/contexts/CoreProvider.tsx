import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { FetchPurchasedModule } from '@/modules/member-management/types/api';
import {
  MembershipTableData,
  MemberTableData,
} from '@/modules/member-management/types/views';
import {
  getMemberList,
  getMembershipList,
  getRegisteredMembershipList,
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

  const [companyId, setCompanyId] = useState<string>('');

  // TODO: 20250406 상태관리 라이브러리로 변경
  useEffect(() => {
    for (const item of purchasedModules) {
      if (item.module.moduleType === InployModules.MemberManagement) {
        setMemberManagementInstanceId(item.moduleInstanceId.id);

        setMembershipTableData(
          getMembershipList(item.moduleInstanceId.membershipIds),
        );

        const membershipRegistrationList = getRegisteredMembershipList(
          item.moduleInstanceId.membershipIds,
          item.moduleInstanceId.membershipRegistrationIds,
        );

        setMemberTableData(
          getMemberList(
            item.moduleInstanceId.memberIds,
            membershipRegistrationList,
          ),
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
      setCompanyId: setCompanyId,
      companyId: companyId,
    }),
    [
      getPurchasedModules,
      purchasedModules,
      memberTableData,
      membershipTableData,
      memberManagementInstanceId,
      setCompanyId,
      companyId,
    ],
  );

  return (
    <CoreContext.Provider value={contextValue}>{children}</CoreContext.Provider>
  );
}
