import { ColumnDef } from '@tanstack/react-table';
import { LucidePencil } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MembershipTableData,
  MemberTableData,
  RegisteredMembership,
} from '@/modules/member-management/types/views';
import {
  EmployeeTableData,
  TrainerTableData,
} from '@/modules/workforce/types/api';

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
          {memberships.map((value) => (
            <div key={value.id}>
              <span>{value.displayName}</span>
              <span>{value.usedSessionCount}</span>
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

export function getEmployeeColumns(
  handleOpenModal: (employee: EmployeeTableData) => void,
): ColumnDef<EmployeeTableData>[] {
  return [
    {
      accessorKey: 'id',
      header: () => <span>id</span>,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'name',
      header: () => <span>이름</span>,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: () => <span>이메일</span>,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'phone',
      header: () => <span>전화번호</span>,
      cell: (info) => info.getValue(),
    },
    {
      id: 'actionIcon',
      cell: (info) => {
        return (
          <Button
            size="icon"
            onClick={() => {
              handleOpenModal(info.row.original);
            }}
          >
            <LucidePencil className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];
}

export const trainerColumns: ColumnDef<TrainerTableData>[] = [
  {
    accessorKey: 'id',
    header: () => <span>id</span>,
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: 'sub',
    header: () => <span>sub</span>,
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: () => <span>이름</span>,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'phone',
    header: () => <span>전화번호</span>,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'team',
    header: () => <span>팀</span>,
    cell: (info) => info.getValue(),
  },
];
