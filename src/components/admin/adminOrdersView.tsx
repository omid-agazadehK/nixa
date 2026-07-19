import { prisma } from "@/lib/prisma";
import { DataTable } from "../ui/data-table";
import { ordersColumns } from "./ordersColumns";

export default async function AdminOrdersView({ pageParam }: { pageParam: string }) {
  const page = Math.max(1, Number(pageParam) || 1);
  const limit = 10;
  const totalPages = Math.ceil((await prisma.order.count()) / limit);

  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
    skip: (+page - 1) * limit,
    take: limit,
  });
  return (
    <section>
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground text-sm">
          View and manage all customer orders from your store.
        </p>
      </div>
      <DataTable
        columns={ordersColumns}
        data={orders}
        page={page}
        totalPages={totalPages}
        filterColumn="fullName"
        baseUrl="/admin/orders"
      />
    </section>
  );
}
