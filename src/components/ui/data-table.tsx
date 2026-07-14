"use client";
import { DataTablePagination } from "@/components/ui/dataTablePagination";
import DataTableToolbar from "@/components/ui/dataTableToolbar";
import TableContent from "@/components/ui/tableContent";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
  createButton?: {
    href: string;
    label: string;
  };
  page: number;
  totalPages: number;
  baseUrl:string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  totalPages,
  filterColumn,
  createButton,
  baseUrl
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: page - 1,
        pageSize: 10,
      },
    },
    manualPagination: true,
  });

  return (
    <div className="bg-card rounded-2xl border">
      <DataTableToolbar
        filterColumn={filterColumn}
        createButton={createButton}
        table={table}
      />
      <TableContent table={table} columns={columns} />
      <DataTablePagination page={page} totalPages={totalPages} baseUrl={baseUrl}/>
    </div>
  );
}
