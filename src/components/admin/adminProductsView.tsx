import { prisma } from "@/lib/prisma";
import { productColumns } from "./productColumns";
import { DataTable } from "../ui/data-table";
import { unstable_cache } from "next/cache";

export default async function AdminProductsView({
  pageParam,
}: {
  pageParam: string;
}) {
  const getProducts = unstable_cache(
  async (page: number) => {
    const limit = 10;

    const total = await prisma.product.count();

    const products = await prisma.product.findMany({
      include: { category: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      products,
      totalPages: Math.ceil(total / limit),
    };
  },
  ["products"],
  {
    revalidate: 60,
    tags: ["products"],
  }
);
  const page = Math.max(1, Number(pageParam) || 1);
const { products, totalPages } = await getProducts(Number(page));
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
