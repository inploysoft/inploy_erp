import { FetchPurchasedModule } from '@/modules/member-management/types/api';
import {
  MembershipTableData,
  MemberTableData,
  RegisteredMembership,
} from '@/modules/member-management/types/views';
import { formatInternationalPhoneToKorean } from '@/shared/lib/format';

export function getMemberList(
  members: FetchPurchasedModule['moduleInstanceId']['memberIds'],
  registeredMemberships: RegisteredMembership[],
): MemberTableData[] {
  return members.flatMap((memberInfo) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { moduleInstanceId, ...rest } = memberInfo;

    const phone = formatInternationalPhoneToKorean(rest.phone);

    return {
      ...rest,
      phone: phone,
      memberships: registeredMemberships,
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

/**
 * 회원이 구매한 이용권 목록
 * @param memberships 전체 이용권 목록
 * @param registeredMemberships 회원이 구매한 이용권 목록
 * @returns 회원이 구매한 이용권 목록 (이용권 내용 포함)
 */
export function getRegisteredMembershipList(
  memberships: FetchPurchasedModule['moduleInstanceId']['membershipIds'],
  registeredMemberships: FetchPurchasedModule['moduleInstanceId']['membershipRegistrationIds'],
): RegisteredMembership[] {
  return registeredMemberships.map((item) => {
    const registered = memberships.filter(
      (value) => value.id === item.membershipId,
    );

    return {
      ...item,
      ...registered[0],
    };
  });
}
