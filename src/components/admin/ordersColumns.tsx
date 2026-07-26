"use client";

import { DataTableColumnHeader } from "@/components/shared/dataTableColumnHeader";
import { ORDER_STATUS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { OrderWithRelations } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import OrderActionSheet from "./orderActionSheet";

export const ordersColumns: ColumnDef<OrderWithRelations>[] = [
  {
    accessorKey: "id",
    header: "Order id",
    cell: ({ row }) => {
      return <span>ORD-{row.original.orderNumber}</span>;
    },
  },
  {
    accessorKey: "fullName",
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
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm px-0 "
          column={column}
          title="Total"
        />
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.totalPrice.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm px-0 "
          column={column}
          title="Date"
        />
      );
    },
    cell: ({ row }) => {
      return <span>{formatDate(row.original.createdAt)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm px-0 "
          column={column}
          title="Status"
        />
      );
    },

    cell: ({ row }) => {
      const order = row.original;
      return (
        <Badge
          variant="outline"
          className={` text-xs ${ORDER_STATUS[order.status].style}`}
        >
          {ORDER_STATUS[order.status].label}
        </Badge>
      );
    },
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const order = row.original;

      return <OrderActionSheet order={order} />;
    },
  },
];
