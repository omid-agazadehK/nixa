import { prisma } from "@/lib/prisma";
import { DataTable } from "../ui/data-table";
import { ordersColumns } from "./ordersColumns";

export default async function AdminOrdersView() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return (
    <section className="p-6 max-w-6xl w-full mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground text-sm">
          View and manage all customer orders from your store.
        </p>
      </div>
      <DataTable
        columns={ordersColumns}
        data={orders}
        filterColumn="fullName"
      />
    </section>
  );
}
