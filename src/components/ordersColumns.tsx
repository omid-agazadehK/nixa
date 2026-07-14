"use client";

import { updateOrderStatus } from "@/actions/order.actios";
import { DataTableColumnHeader } from "@/components/ui/dataTableColumnHeader";
import { ORDER_STATUS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { OrderWithRelations } from "@/types";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Package } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const ordersColumns: ColumnDef<OrderWithRelations>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="text-xs lg:text-sm px-0 "
          column={column}
          title="OrderId"
        />
      );
    },
    cell: ({ row }) => {
      return <span>#{row.original.id.slice(0, 8)}</span>;
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
          {row.original.status}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      const user = row.original.user;
      const orderItems = row.original.items;
      const totalPrice = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      console.log(OrderStatus[order.status]);
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Eye />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Order Details</SheetTitle>
            </SheetHeader>

            <Separator />
            <div className="grid flex-1 auto-rows-min gap-6 px-4 ">
              <div className="flex items-center justify-between">
                <span className="font-medium">#{order.id.slice(0, 8)}</span>
                <Badge
                  variant={"outline"}
                  className={` text-xs ${ORDER_STATUS[order.status].style}`}
                >
                  {order.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex font-medium flex-col text-xs gap-2 bg-muted p-2 border rounded">
                  <span className="upercase font-semibold  text-muted-foreground truncate">
                    CUSTOMER
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm truncate">{user.fullName}</span>
                    <span className="text-muted-foreground truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
                <div className="flex font-medium flex-col text-xs gap-2 bg-muted p-2 border rounded w-full  h-full ">
                  <span className="upercase font-semibold  text-muted-foreground truncate">
                    DATE
                  </span>
                  <span className="text-sm  truncate">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </div>
              <h5>ITEMS</h5>
              <div className="flex flex-col items-center justify-center w-full gap-4 max-h-200 overflow-y-auto">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-muted border rounded  flex items-center justify-between px-4 py-3 w-full"
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-background rounded-lg text-muted-foreground p-2">
                        <Package className="size-5" />
                      </div>
                      <span className="max-w-50 truncate text-xs">
                        {item.product.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-xs">
                      <span>${item.product.price.toFixed(2)}</span>
                      <span>*{item.quantity}</span>
                    </div>
                  </div>
                ))}
                <div className="bg-muted border rounded text-sm flex items-center justify-between px-4 py-3 w-full">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <span>Update Status</span>
              <div className="flex items-center gap-2 flex-wrap">
                {Object.values(OrderStatus).map((status) => {
                  const config = ORDER_STATUS[status];
                  return (
                    <Button
                      key={status}
                      variant="outline"
                      className={`cursor-pointer ${OrderStatus[status] === order.status ? config.style : ""}
                    `}
                      onClick={() => updateOrderStatus(order.id, status)}
                    >
                      {config.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      );
    },
  },
];
