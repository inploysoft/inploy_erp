import { ColumnDef } from '@tanstack/react-table';
import { LucidePencil } from 'lucide-react';

import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MembershipTableData,
  MemberTableData,
  MemberTableData2,
  RegisteredMembership,
} from '@/modules/member-management/types/views';
import { getRankLabel } from '@/modules/workforce/components/EmployeeDialog';
import {
  EmployeeTableData,
  TrainerTableData,
} from '@/modules/workforce/types/api';
import dayjs from 'dayjs';
import { memberExcelSchema } from '../types/api';

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

export const memberColumns2: ColumnDef<MemberTableData2>[] = [
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
    header: 'id',
    cell: (info) => info.getValue(),
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: '이름',
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'phone',
    header: '핸드폰번호',
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'lastVisitedAt',
    header: '최근방문일',
    cell: (info) => info.getValue(),
    enableSorting: true,
  },

  {
    id: 'membershipDisplayName',
    header: '보유이용권',
    accessorFn: (row) => row.memberships,
    cell: (info) => {
      const memberships = info.getValue() as z.infer<
        typeof memberExcelSchema
      >[];

      return (
        <div>
          {memberships.map((value, index) => (
            <div className="my-1 flex" key={index}>
              <span>{value.displayName}</span>
            </div>
          ))}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    id: 'membershipExpiredAt',
    header: '만료일',
    accessorFn: (row) => row.memberships,
    cell: (info) => {
      const memberships = info.getValue() as z.infer<
        typeof memberExcelSchema
      >[];

      return (
        <div>
          {memberships.map((value, index) => (
            <div className="flex gap-8" key={index}>
              <span>{value.expiredAt}</span>
            </div>
          ))}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    id: 'membershipStatus',
    header: '이용권 상태',
    accessorFn: (row) => row.memberships,
    cell: (info) => {
      const memberships = info.getValue() as z.infer<
        typeof memberExcelSchema
      >[];

      return (
        <div>
          {memberships.map((value, index) => {
            let status: string = '';
            const today = dayjs().startOf('day');
            const expiry = dayjs(value.expiredAt).startOf('day');

            if (today > expiry) {
              status = '만료';
            } else {
              status = '유효';
            }

            return (
              <div className="flex gap-8" key={index}>
                <span>{status}</span>
              </div>
            );
          })}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'FCtrainer',
    header: 'FC담당자',
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'PTtrainer',
    header: 'PT담당자',
    cell: (info) => info.getValue(),
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
      accessorKey: 'rank',
      header: () => <span>직급</span>,
      cell: (info) => getRankLabel(info.getValue() as string),
    },
    {
      accessorKey: 'position',
      header: () => <span>직책</span>,
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
