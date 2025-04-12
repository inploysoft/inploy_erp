import { FetchPurchasedModule } from '@/modules/member-management/types/api';
import {
  MembershipTableData,
  MemberTableData,
} from '@/modules/member-management/types/views';
import { formatInternationalPhoneToKorean } from '@/shared/lib/format';

export function getMemberList(
  members: FetchPurchasedModule['moduleInstanceId']['memberIds'],
  memberships: FetchPurchasedModule['moduleInstanceId']['membershipRegistrationIds'],
): MemberTableData[] {
  return members.flatMap((memberInfo) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { moduleInstanceId, ...rest } = memberInfo;

    const phone = formatInternationalPhoneToKorean(rest.phone);

    return {
      ...rest,
      phone: phone,
      memberships: memberships,
    } as MemberTableData;
  });
}

export function getMembershipList(
  memberships: FetchPurchasedModule['moduleInstanceId']['membershipIds'],
): MembershipTableData[] {
  return memberships.flatMap((membershipInfo) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { moduleInstanceId, ...rest } = membershipInfo;

    return rest;
  });
}
