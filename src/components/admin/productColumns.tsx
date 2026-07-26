"use client";

import { DataTableColumnHeader } from "@/components/shared/dataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { ProductWithCategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import ProductActions from "./productActions";

export const productColumns: ColumnDef<ProductWithCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm px-0 "
          column={column}
          title="Name"
        />
      );
    },
  },
  {
    accessorKey: "category",
    accessorFn: (row) => row.category.name,
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm"
          column={column}
          title="Category"
        />
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm"
          column={column}
          title="Price"
        />
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm"
          column={column}
          title="Stock"
        />
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm"
          column={column}
          title="Status"
        />
      );
    },
    cell: ({ row }) => (
      <Badge
        className="text-xs"
        variant={row.original.isActive ? "default" : "destructive"}
      >
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return <ProductActions product={product} />;
    },
  },
];
