import { updateProduct } from "@/actions/product.actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminProductForm from "./adminProductForm";

export default async function EditProductPageView({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const [categories, product] = await Promise.all([
    prisma.category.findMany(),
    prisma.product.findUnique({ where: { id } }),
  ]);
  if (!product) {
    notFound();
  }
  return (
    <section className="flex items-center justify-center mt-10">
      <AdminProductForm
        categories={categories}
        product={product}
        onSubmit={updateProduct.bind(null, id)}
      />
    </section>
  );
}
