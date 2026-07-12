import { prisma } from "@/lib/prisma";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function AdminProductsPage() {
  const data = await prisma.product.findMany({ include: { category: true } });
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
