import { useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './DataTablePagination';
import { DataTableViewOptions } from './DataTableViewOptions';

interface DataTableProps<TData> extends DataTableCustomProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

interface DataTableCustomProps<TData> {
  filterKey?: string;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData>({
  columns,
  data,
  filterKey,
  onRowClick,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const [rowSelection, setRowSelection] = useState({});

  //
  const table = useReactTable({
    data: data,
    columns: columns,
    initialState: {
      columnVisibility: {
        id: false,
        sub: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),

    // filter
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    // sort
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    // pagination
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),

    onRowSelectionChange: setRowSelection,

    state: {
      columnFilters: columnFilters,
      sorting: sorting,
      pagination: pagination,
      rowSelection: rowSelection,
    },
  });

  return (
    <div className="rounded-md border bg-white p-6">
      <div className="flex items-center">
        <Input
          placeholder="Filter emails..."
          value={
            (table.getColumn(filterKey ?? 'id')?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) =>
            table
              .getColumn(filterKey ?? 'id')
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DataTableViewOptions table={table} />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
}
