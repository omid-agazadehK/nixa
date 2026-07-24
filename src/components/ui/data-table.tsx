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
  getPaginationRowModel,
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
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  createButton,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="bg-card rounded-2xl border  ">
      <DataTableToolbar
        filterColumn={filterColumn}
        createButton={createButton}
        table={table}
      />
      <TableContent table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  );
}
