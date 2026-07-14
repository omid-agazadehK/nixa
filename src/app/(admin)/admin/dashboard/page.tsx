import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { Box, ShoppingCart, TrendingUp, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const [products, orders, users] = await Promise.all([
    prisma.product.count({where:{ isActive: true } }),
    prisma.order.count(),
    prisma.user.count(),
  ]);
  return (
    <section>
      <div className="flex items-start flex-col gap-1">
        <h5 className="text-3xl font-semibold">Welcome back, Admin</h5>
        <p>Here&rsquo;s what&rsquo;s happening with your store today.</p>
      </div>
      <div className="grid grid-cols-12 gap-2  mt-10">
        <div className="h-50 w-full max-w-96 bg-card p-6 hover:drop-shadow-sm border transition-shado duration-300  hover:-translate-y-1  lg:col-span-3 md:col-span-4 col-span-12 flex flex-col justify-between  gap-4 font-semibold text-2xl  rounded-2xl">
          <div className="flex items-start justify-between w-full">
            <div className="bg-muted  border rounded-md p-2 flex items-center justify-center">
              <Box />
            </div>
            <Badge className="bg-green-100 border border-green-300 text-green-600">
              <TrendingUp />
              Live
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-normal">
              Total Products
            </p>
            <p className="text-4xl font-semibold ">{products}</p>
          </div>
        </div>
        <div className="h-50 w-full max-w-96 bg-card p-6 hover:drop-shadow-sm border transition-shado duration-300  hover:-translate-y-1  lg:col-span-3 md:col-span-4 col-span-12 flex flex-col justify-between  gap-4 font-semibold text-2xl  rounded-2xl">
          <div className="flex items-start justify-between w-full">
            <div className="bg-muted  border rounded-md p-2 flex items-center justify-center">
              <ShoppingCart />
            </div>
            <Badge className="bg-green-100 border border-green-300 text-green-600">
              <TrendingUp />
              Live
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-normal">
              Total Orders
            </p>
            <p className="text-4xl font-semibold ">{orders}</p>
          </div>
        </div>
        <div className="h-50 w-full max-w-96 bg-card p-6 hover:drop-shadow-sm border transition-shado duration-300  hover:-translate-y-1  lg:col-span-3 md:col-span-4 col-span-12 flex flex-col justify-between  gap-4 font-semibold text-2xl  rounded-2xl">
          <div className="flex items-start justify-between w-full">
            <div className="bg-muted  border rounded-md p-2 flex items-center justify-center">
              <Users />
            </div>
            <Badge className="bg-green-100 border border-green-300 text-green-600">
              <TrendingUp />
              Live
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-normal">
              Total Users
            </p>
            <p className="text-4xl font-semibold ">{users}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
