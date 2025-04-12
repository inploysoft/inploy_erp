import { FetchPurchasedModule } from '@/types/member-management/api';
import {
  MembershipTableData,
  MemberTableData,
} from '@/types/member-management/views';

export function getMemberList(
  members: FetchPurchasedModule['moduleInstanceId']['memberIds'],
  memberships: FetchPurchasedModule['moduleInstanceId']['membershipRegistrationIds'],
): MemberTableData[] {
  return members.flatMap((memberInfo) => {
    return {
      id: memberInfo.id,
      name: memberInfo.name,
      birthDate: memberInfo.birthDate ?? '',
      gender: memberInfo.gender ?? '',
      membership: memberships.map(
        (membershipInfo) => membershipInfo.membershipId,
      ),
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
