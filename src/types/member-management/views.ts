/* UI 에서 쓰는 조합형 타입 */

import { Member } from '@/models/member';

// TODO: 20250406
// entity required 변경 -> Membership['name'] 변경,
// expiredDate, remainingDays, remainingCount -> membership[] 에 포함
export type MemberTableData = Pick<
  Member,
  'id' | 'name' | 'birthDate' | 'gender'
> & {
  membership: string[];
  // expiredDate: string;
  // remainingDays: number;
  // remainingCount: number;
};
