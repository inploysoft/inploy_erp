/* 화면 표시용 데이터 가공 함수 모음 */

import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

/**
 * 국제 전화번호 형식(+82 10-5273-1404)을 한국 전화번호 형식(010-5273-1404)으로 변환
 * @param phone 국제 형식의 전화번호 (예: +82 10-5273-1404)
 * @returns 한국 형식의 전화번호 (예: 010-5273-1404)
 * @deprecated 빌드시 eval()에러로 libphonenumber-js로 변환 예정
 */
export function formatInternationalPhoneToKorean(phone: string): string {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phone, 'KR');

    if (phoneUtil.isValidNumberForRegion(number, 'KR')) {
      return phoneUtil.format(number, PhoneNumberFormat.NATIONAL);
    }

    return phone;
  } catch (e) {
    console.error('번호 파싱 실패:', e);

    return phone;
  }
}

/**
 * 한국 전화번호 형식(010-5273-1404)을 국제 전화번호 형식(+82 10-5273-1404)으로 변환
 * @param phone 한국 형식의 전화번호 (예: 010-5273-1404)
 * @returns 국제 형식의 전화번호 (예: +82 10-5273-1404)
 * @deprecated 빌드시 eval()에러로 libphonenumber-js로 변환 예정
 */
export function formatKoreanPhoneToInternational(phone: string): string {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phone, 'KR');

    if (phoneUtil.isValidNumberForRegion(number, 'KR')) {
      return phoneUtil.format(number, PhoneNumberFormat.E164);
    }

    return phone;
  } catch (e) {
    console.error('번호 파싱 실패:', e);
    return phone;
  }
}
