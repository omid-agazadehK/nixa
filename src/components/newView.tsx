import { prisma } from "@/lib/prisma";
import AdminProductForm from "./adminProductForm";
import { createProduct } from "@/actions/product.actions";

export default async function NewView() {
  const categories = await prisma.category.findMany();

  return (
    <section className="mt-10 flex items-center justify-center ">
      <AdminProductForm categories={categories} onSubmit={createProduct} />
    </section>
  );
}
