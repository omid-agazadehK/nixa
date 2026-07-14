import { OrderStatus } from "@prisma/client";

export const ORDER_STATUS = {
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    style: "bg-green-500/50 hover:bg-green-500/50 border-green-500/80 text-green-700 hover:text-green-700 ",
  },
  [OrderStatus.PENDING]: {
    label: "Pending",
    style: "bg-yellow-500/50 hover:bg-yellow-500/50 border-yellow-500/80 text-yellow-700 hover:text-yellow-700 ",
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancelled",
    style: "bg-red-500/50 hover:bg-red-500/50 border-red-500/80 text-red-700 hover:text-red-700 ",
  },
} as const satisfies Record<
  OrderStatus,
  {
    label: string;
    style: string;
  }
>;
