import { prisma } from "@/lib/prisma";
import { productColumns } from "./productColumns";
import { DataTable } from "../ui/data-table";

export default async function AdminProductsView({
  pageParam,
}: {
  pageParam: string;
}) {
  const page = Math.max(1, Number(pageParam) || 1);
  const limit = 10;
  const totalPages = Math.ceil((await prisma.product.count()) / limit);
  const products = await prisma.product.findMany({
    include: { category: true },
    skip: (+page - 1) * limit,
    take: limit,
  });
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <p className="text-sm text-muted-foreground">
          Manage your store products, update inventory, and keep your catalog
          organized.
        </p>
      </div>
      <DataTable
        columns={productColumns}
        data={products}
        filterColumn="name"
        createButton={{
          href: "/admin/products/new",
          label: "Create product",
        }}
        baseUrl="/admin/products"
        page={page}
        totalPages={totalPages}
      />
    </section>
  );
}
