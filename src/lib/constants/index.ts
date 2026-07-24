import { MobileNavRoutes, SortKey, SortOption } from "@/types";
import { OrderStatus } from "@prisma/client";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  UsersRound,
} from "lucide-react";

export const ORDER_STATUS = {
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    style:
      "bg-green-500/20 hover:bg-green-500/20 border-green-500/80 text-green-700 hover:text-green-700 ",
  },
  [OrderStatus.PENDING]: {
    label: "Pending",
    style:
      "bg-yellow-500/20 hover:bg-yellow-500/20 border-yellow-500/80 text-yellow-700 hover:text-yellow-700 ",
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancelled",
    style:
      "bg-red-500/20 hover:bg-red-500/20 border-red-500/80 text-red-700 hover:text-red-700 ",
  },
} as const satisfies Record<
  OrderStatus,
  {
    label: string;
    style: string;
  }
>;

export const mobileNavRoutes: MobileNavRoutes[] = [
  {
    title: "Home",
    href: "/",
    icon: "House",
  },
  {
    title: "Shop",
    href: "/shop",
    icon: "ShoppingBag",
  },
  {
    title: "Cart",
    href: "/cart",
    icon: "ShoppingBasket",
  },
];
export const sortMap: Record<SortKey, SortOption> = {
  "price-asc": { price: "asc" },
  "price-desc": { price: "desc" },
  newest: { createdAt: "desc" },
};
export const orderStatuses = [
  {
    status: OrderStatus.PENDING,
    label: "Pending",
    color: "bg-yellow-500",
  },
  {
    status: OrderStatus.DELIVERED,
    label: "Delivered",
    color: "bg-green-500",
  },
  {
    status: OrderStatus.CANCELLED,
    label: "Cancelled",
    color: "bg-destructive",
  },
];

export const sidebarData = {
  navMain: [
    {
      title: "Menu",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Products",
          url: "/admin/products",
          icon: Package,
        },
        {
          title: "Orders",
          url: "/admin/orders",
          icon: ShoppingBag,
        },
        {
          title: "Users",
          url: "/admin/users",
          icon: UsersRound,
        },
      ],
    },
  ],
};
