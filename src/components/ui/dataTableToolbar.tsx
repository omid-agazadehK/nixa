"use client"
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import Link from "next/link";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn?: string;
  createButton?: {
    href: string;
    label: string;
  };
}
export default function DataTableToolbar<TData>({
  filterColumn,
  table,
  createButton,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-4 px-2">
      {filterColumn && (
        <Input
          placeholder="search ..."
          value={
            (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
          }
          className="md:max-w-sm text-sm w-full sm:w-auto bg-card"
        />
      )}

      <div className="flex items-center gap-2 mr-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {createButton && (
          <Button asChild size="sm">
            <Link href={createButton.href}>{createButton.label}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
