import { ColumnDef } from '@tanstack/react-table';

import { MemberTableData } from '@/types/member-management/views';

// 컬럼 밑에 방식으로 새로 만들기, 이슈 새로 만들기
export const memberColumns: ColumnDef<MemberTableData>[] = [
  {
    accessorKey: 'id',
    header: () => <span>id</span>,
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: () => <span>이름</span>,
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'birthDate',
    header: () => <span>생일</span>,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'gender',
    header: () => <span>성별</span>,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'membership',
    header: () => <span>이용권</span>,
    cell: (info) => {
      const memberships = info.getValue() as string[];
      return (
        <div>
          {memberships.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
      );
    },
  },
];


