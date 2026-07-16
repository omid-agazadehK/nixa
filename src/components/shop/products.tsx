import { prisma } from "@/lib/prisma";
import { ShopSearchParams, SortKey, SortOption } from "@/types";
import ProductCard from "./productCard";

export default async function Products({
  searchParams,
}: {
  searchParams: ShopSearchParams;
}) {
  const sortMap: Record<SortKey, SortOption> = {
    "price-asc": { price: "asc" },
    "price-desc": { price: "desc" },
    newest: { createdAt: "desc" },
  };
  const products = await prisma.product.findMany({
    where: {
      name: searchParams.q
        ? { contains: searchParams.q, mode: "insensitive" }
        : undefined,
      category: searchParams.category
        ? { slug: searchParams.category }
        : undefined,
      isActive: true,
    },
    orderBy: sortMap[searchParams.sort ?? "newest"],
    include: { category: true },
  });

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
