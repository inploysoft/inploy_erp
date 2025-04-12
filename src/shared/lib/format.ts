/* 화면 표시용 데이터 가공 함수 모음 */

/**
 * 국제 전화번호 형식(+82 10-5273-1404)을 한국 전화번호 형식(010-5273-1404)으로 변환합니다.
 * @param phone 국제 형식의 전화번호 (예: +82 10-5273-1404)
 * @returns 한국 형식의 전화번호 (예: 010-5273-1404)
 */
export function formatInternationalPhoneToKorean(phone: string): string {
  if (!phone) {
    return '';
  }

  if (!phone.startsWith('+82')) {
    return phone;
  }

  const numberWithoutCountryCode = '0' + phone.substring(3);

  const cleaned = numberWithoutCountryCode.replace(/\s+/g, '');

  return cleaned;
}
