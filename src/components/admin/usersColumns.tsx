"use client";

import { DataTableColumnHeader } from "@/components/shared/dataTableColumnHeader";
import { formatDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import AdminUserActions from "./adminUserActions";
type AdminUser = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        orders: true;
      };
    };
  };
}>;
export const usersColumns: ColumnDef<AdminUser>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm px-0 "
          column={column}
          title="Email"
        />
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm px-0 "
          column={column}
          title="Role"
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm px-0 "
          column={column}
          title="Joined"
        />
      );
    },
    cell: ({ row }) => {
      return formatDate(row.original.createdAt);
    },
  },
  {
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm px-0 "
          column={column}
          title="Orders"
        />
      );
    },
    cell: ({ row }) => {
      return row.original._count.orders;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const userId = row.original.id;

      return <AdminUserActions userId={userId} />;
    },
  },
];
