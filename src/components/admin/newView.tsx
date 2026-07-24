import { createProduct } from "@/actions/product.actions";
import { prisma } from "@/lib/prisma";
import AdminProductForm from "./adminProductForm";

export default async function NewView() {
  const categories = await prisma.category.findMany();

  return (
    <div className="p-6 max-w-6xl w-full mx-auto space-y-6">
      <section className="mt-10 flex items-center justify-center ">
        <AdminProductForm categories={categories} onSubmit={createProduct} />
      </section>
    </div>
  );
}
