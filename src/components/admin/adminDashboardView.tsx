import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import LowStockProducts from "./lowStockProducts";
import OrderStatus from "./orderStatus";
import RecentOrders from "./recentOrders";
import StatCard from "./statCard";
export type OrderWithUser = Prisma.OrderGetPayload<{
  include: {
    user: true;
  };
}>;

export default async function AdminDashboardView() {
  const [TotalProducts, TotalOrders, TotalUsers, TotalRevenue] =
    await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.user.count(),
      prisma.order.aggregate({
        where: {
          status: "DELIVERED",
        },
        _sum: {
          totalPrice: true,
        },
      }),
    ]);
  const stats = [
    {
      title: "Total Products",
      value: TotalProducts,
      icon: Package,
    },
    {
      title: "Total Orders",
      value: TotalOrders,
      icon: ShoppingBag,
    },
    {
      title: "Total Users",
      value: TotalUsers,
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: `$${TotalRevenue._sum.totalPrice?.toFixed(2)}`,
      icon: DollarSign,
    },
  ];
  
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  const statusCounts = await prisma.order.groupBy({
    by: ["status"],
    _count: true,
  });

  return (
    <div className="p-6 max-w-6xl w-full mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-fg-muted mt-0.5">
          Overview of your store performance.
        </p>
      </div>
      <section className="mt-2">
        <div className="grid bg-card grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrders orders={recentOrders} />

        <OrderStatus orders={statusCounts} />
      </div>
      <LowStockProducts />
    </div>
  );
}
