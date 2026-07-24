import { orderStatuses } from "@/lib/constants";
import { OrderStatusCount } from "@/types";
import { Separator } from "../ui/separator";
import AdminOrderStatusItem from "./adminOrderStatusItem";

export default function OrderStatus({
  orders,
}: {
  orders: OrderStatusCount[];
}) {
  const totalOrders = orders.reduce((sum, item) => item._count + sum, 0);

  const statusCounts = Object.fromEntries(
    orders.map((item) => [item.status, item._count]),
  );
  return (
    <section className="rounded-lg border border-border bg-card ">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold">Order Status</h2>
      </div>
      <div className="p-5 space-y-5 ">
        {orderStatuses.map((item) => (
          <AdminOrderStatusItem
            key={item.status}
            label={item.label}
            count={statusCounts[item.status] ?? 0}
            total={totalOrders}
            color={item.color}
          />
        ))}

        <Separator />
        <div className="flex items-center justify-between ">
          <span className="text-sm">Total</span>
          <span>{totalOrders}</span>
        </div>
      </div>
    </section>
  );
}
