import { ORDER_STATUS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { OrderWithUser } from "./adminDashboardView";

export default function RecentOrders({ orders }: { orders: OrderWithUser[] }) {
  return (
    <section className="lg:col-span-2 rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold">Recent Orders</h2>
        <Link
          href="/admin/orders"
          className="text-xs font-medium text-fg-muted hover:text-foreground transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-black">
                  ORD-{order.orderNumber}
                </TableCell>
                <TableCell className="font-light ">
                  {order.user.fullName}
                </TableCell>
                <TableCell className="font-light ">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={` text-xs ${ORDER_STATUS[order.status].style}`}
                  >
                    {ORDER_STATUS[order.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-black">
                  ${order.totalPrice.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
