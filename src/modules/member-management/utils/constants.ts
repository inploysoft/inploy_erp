import { MemberTableData } from '@/modules/member-management/types/views';

// User table mock
export const memberData: MemberTableData[] = [
  {
    id: 'user-001',
    name: '홍길동',
    gender: '남성',
    birthDate: '1990-01-15',
    membership: ['헬스 3개월'],
  },
  {
    id: 'user-002',
    name: '김영희',
    gender: '여성',
    birthDate: '1985-07-22',
    membership: ['요가 1개월'],
  },
  {
    id: 'user-003',
    name: '이철수',
    gender: '남성',
    birthDate: '1993-11-09',
    membership: ['PT 10회'],
  },
];
