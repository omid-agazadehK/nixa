import { prisma } from "@/lib/prisma";
import { DataTable } from "../ui/data-table";
import { productColumns } from "./productColumns";

export default async function AdminProductsView() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  return (
    <section className="p-6 max-w-6xl w-full mx-auto space-y-6">
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
      />
    </section>
  );
}
