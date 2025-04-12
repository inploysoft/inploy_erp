import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import {
  MembershipTableData,
  MemberTableData,
  RegisteredMembership,
} from '@/modules/member-management/types/views';

export const memberColumns: ColumnDef<MemberTableData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: 'phone',
    header: () => <span>전화번호</span>,
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'birthDate',
    header: () => <span>생일</span>,
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'gender',
    header: () => <span>성별</span>,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'memberships',
    header: () => <span>이용권</span>,
    cell: (info) => {
      const memberships = info.getValue() as RegisteredMembership[];

      return (
        <div>
          {memberships.map((value, index) => (
            <div>
              <span key={index}>{value.displayName}</span>
              <span key={index}>{value.usedSessionCount}</span>
            </div>
          ))}
        </div>
      );
    },
    enableSorting: true,
  },
];

export const membershipColumns: ColumnDef<MembershipTableData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: () => <span>id</span>,
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: 'displayName',
    header: () => <span>이름</span>,
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'durationValue',
    header: () => <span>기간</span>,
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'durationUnit',
    header: () => <span>단위</span>,
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'sessionCount',
    header: () => <span>횟수</span>,
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'price',
    header: () => <span>가격</span>,
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
];
