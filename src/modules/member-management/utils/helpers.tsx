import dayjs from 'dayjs';

import {
  MembershipTableData,
  MemberTableData,
} from '@/modules/member-management/types/views';
import { FetchMemberWithRelations } from '@/shared/types/api';
import {
  Membership,
  MembershipDurationUnit,
  MembershipRegisterType,
} from '../models/membership';
import { MembershipRegistrationStatus } from '../models/membershipRegistration';

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
    const { membershipRegistrationIds, ...rest } = member;

    const membershipRegistrationFlatten = membershipRegistrationIds.flatMap(
      (membershipRegistration) => {
        const { trainer, membership, ...rest } = membershipRegistration;

        return {
          ...rest,
          ...membership,
          ...trainer,
        };
      },
    );

    return {
      ...rest,
      memberships: membershipRegistrationFlatten,
    };
  });

  return result;
}

/**
 * 이용권 목록 반환
 * @param memberships 전체 이용권 목록
 * @returns 이용권 목록
 */
export function formatMembershipTableData(
  memberships: Membership[],
): MembershipTableData[] {
  return memberships.flatMap((membershipInfo) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { moduleInstanceId, ...rest } = membershipInfo;

    return rest;
  });
}

/**
 * 이용권 상태를 한글로 변환
 * @param status 이용권 상태 ('valid' | 'expired')
 * @returns 한글로 변환된 상태 ('유효' | '만료')
 */
export function convertMembershipStatusToKorean(
  status: MembershipRegistrationStatus | null,
): string {
  if (!status) {
    return '';
  }

  return status === 'valid' ? '사용 중' : '만료';
}

/**
 * 이용권 상태를 한글로 변환
 * @param status 이용권 상태 ('valid' | 'expired')
 * @returns 한글로 변환된 상태 ('유효' | '만료')
 */
export function convertMembershipRegisterTypeToKorean(
  registerType: MembershipRegisterType | null,
): string {
  if (!registerType) {
    return '';
  }

  return registerType === 'duration' ? '기간형' : '횟수형';
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
  return '만료됨';
}
