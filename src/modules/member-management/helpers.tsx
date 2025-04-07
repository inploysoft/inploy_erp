import { MemberTableData } from '@/types/member-management/views';
import { FetchPurchasedModule } from '@/types/responseTypes';

export function getMemberList(
  members: FetchPurchasedModule['moduleInstanceId']['memberIds'],
): MemberTableData[] {
  return members.flatMap((memberInfo) => {
    const membership = memberInfo.membershipIds.flatMap(
      (membershipInfo) => membershipInfo.name,
    );

    return {
      id: memberInfo.id,
      name: memberInfo.name,
      birthDate: memberInfo.birthDate ?? '',
      gender: memberInfo.gender ?? '',
      membership: membership,
    } as MemberTableData;
  });
}
