import dayjs from 'dayjs';

import {
  MembershipTableData,
  MemberTableData,
} from '@/modules/member-management/types/views';
import { formatInternationalPhoneToKorean } from '@/shared/lib/format';
import {
  FetchMemberWithRelations,
  MemberManagementEntity,
} from '@/shared/types/api';
import { MembershipDurationUnit } from '../models/membership';

/**
 * 회원 목록 반환
 * @param members 전체 회원 목록
 * @param registeredMemberships 회원이 구매한 이용권 목록
 * @returns 회원 목록
 */
export function formatMemberTableData(
  member: FetchMemberWithRelations[],
): MemberTableData[] {
  const result = member.flatMap((member) => {
    const { membershipRegistrationIds, phone, ...rest } = member;

    const membershipRegistrationFlatten = membershipRegistrationIds.flatMap(
      (membershipRegistration) => {
        const { membershipPlan, trainer } = membershipRegistration;

        return {
          ...membershipPlan,
          ...membershipPlan.membershipType,
          ...membershipRegistration,
          membershipPlanId: membershipPlan.id,
          membershipTypeId: membershipPlan.membershipType.id,
          membershipRegistrationId: membershipRegistration.id,
          trainerId: trainer.id,
          status: convertMembershipStatusToKorean(
            membershipRegistration.expiredAt,
          ),
          trainer: trainer.name,
        };
      },
    );

    return {
      ...rest,
      phone: formatInternationalPhoneToKorean(phone),
      memberships: membershipRegistrationFlatten,
    };
  });

  return result;
}

// export function formatMemberTableDataFromExcel(
//   excelObjects: MemberExcelRowObject[],
// ): MemberTableData[] {
//   return excelObjects.map<MemberTableData>(
//     ({
//       address,
//       memo,
//       memoAt,
//       latestExpiredAt,
//       gender,
//       birthDate,
//       status,
//       ...rest
//     }) => rest,
//   );
// }

/**
 * 이용권 목록 반환
 * @param memberships 전체 이용권 목록
 * @returns 이용권 목록
 */

export function formatMembershipTableData({
  membershipTypeIds,
  membershipPlanIds,
}: MemberManagementEntity): MembershipTableData[] {
  return membershipTypeIds.map((type) => {
    const plans = membershipPlanIds.filter(
      (plan) => type.id === plan.membershipTypeId,
    );

    return {
      displayName: type.displayName,
      plans: plans,
    } as MembershipTableData;
  });
}

/**
 * 이용권 상태를 한글로 변환
 * @param status 이용권 상태 ('valid' | 'expired')
 * @returns 한글로 변환된 상태 ('유효' | '만료')
 */
export function convertMembershipStatusToKorean(
  expiredAt: string | null,
): string {
  let status: string = '';

  const today = dayjs().startOf('day');
  const expiry = dayjs(expiredAt).startOf('day');

  if (today > expiry) {
    status = '만료';
  } else {
    status = '유효';
  }

  return status;
}

/**
 * 현재 날짜가 주어진 `expiredAt` 날짜를 지났는지 판단하는 함수
 *
 * @param {string} expiredAt 만료일
 * @returns {boolean}
 */
export function isExpired(expiredAt: string): boolean {
  return dayjs().isAfter(expiredAt, 'day');
}

/**
 * 오늘부터 최근 30일 이내 만료 예정인 이용권을 가지고 있는 회원 리스트를 반환하는 함수
 *
 * @param {MemberTableData[]} memberTableData Array of membership objects
 * @returns {MemberTableData[]} Members who have memberships that will expire within 30 days from today
 */
export function isWithin30Days(
  memberTableData: MemberTableData[],
): MemberTableData[] {
  return memberTableData.map((member) => {
    const validMemberships = member.memberships.filter((membership) => {
      const diffInDays = dayjs(membership.expiredAt)
        .add(1, 'day')
        .diff(dayjs(), 'day');

      return diffInDays >= 0 && diffInDays <= 30;
    });

    return {
      ...member,
      memberships: validMemberships,
    };
  });
}

/**
 * 오늘부터 최근 30일 이내 만료된 이용권을 가지고 있는 회원 리스트를 반환하는 함수
 *
 * @param {MemberTableData[]} memberTableData Array of membership objects
 * @returns {MemberTableData[]} Members who have memberships that have expired in last 30 days from today
 */
export function isExpiredInLast30Days(
  memberTableData: MemberTableData[],
): MemberTableData[] {
  return memberTableData.map((member) => {
    const validMemberships = member.memberships.filter((membership) => {
      const thirtyDaysAgo = dayjs().subtract(30, 'day');

      const expirationDate = dayjs(membership.expiredAt)
        .add(1, 'day')
        .startOf('day');

      return (
        expirationDate.isBefore(dayjs()) &&
        expirationDate.isAfter(thirtyDaysAgo)
      );
    });

    return {
      ...member,
      memberships: validMemberships,
    };
  });
}

/**
 * 오늘부터 최근 30일 이내 등록한 회원 리스트를 반환하는 함수
 *
 * @param {MemberTableData[]} memberTableData Array of membership objects
 * @returns {MemberTableData[]} Members who are registered in last 30 days from today
 */
export function isRegisteredInLast30Days(
  memberTableData: MemberTableData[],
): MemberTableData[] {
  return memberTableData.filter((member) => {
    const registeredDate = dayjs(member.registeredAt).startOf('day');

    const thirtyDaysAgo = dayjs().subtract(30, 'day');

    return (
      registeredDate.isBefore(dayjs()) && registeredDate.isAfter(thirtyDaysAgo)
    );
  });
}

/**
 * 이용권 기간 단위를 한글로 변환
 * @param durationUnit 이용권 기간 단위
 * @returns 한글로 변환된 기간 단위
 */
export function convertMembershipDurationUnitToKorean(
  durationUnit: MembershipDurationUnit | null,
): string {
  if (!durationUnit) {
    return '';
  }

  if (durationUnit === 'month') {
    return '개월';
  }

  if (durationUnit === 'day') {
    return '일';
  }

  if (durationUnit === 'hour') {
    return '시간';
  }

  if (durationUnit === 'minute') {
    return '분';
  }

  return '';
}

/**
 * 이용권 남은 일수 계산
 * @param registeredAt 이용권 등록일
 * @param expiredAt 이용권 만료일
 * @returns 이용권 남은 일수
 */
export function getRemainingDays(
  registeredAt: string | null,
  expiredAt: string | null,
): string {
  if (!registeredAt || !expiredAt) {
    return '';
  }

  const today = dayjs().startOf('day');
  const startDate = dayjs(registeredAt).startOf('day');
  const endDate = dayjs(expiredAt).startOf('day');

  if (today.isBefore(startDate)) {
    return '미사용';
  }

  const remaining = endDate.diff(today, 'day');

  if (remaining > 0) return `D-${remaining}`;
  if (remaining === 0) return '오늘 만료';
  return '만료';
}

export function isExcelFile(file: File): boolean {
  const allowedExtensions = ['.xlsx', '.xls'];

  const fileName = file.name.toLowerCase();

  return allowedExtensions.some((ext) => fileName.endsWith(ext));
}
