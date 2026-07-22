import { sortMap } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { ShopSearchParams } from "@/types";
import EmptyProductState from "./emptyProdutcState";
import ProductCard from "./productCard";
import ProductsPagination from "./productsPagination";
type Props = {
  searchParams: ShopSearchParams;
};

const LIMIT = 10;
export default async function Products({ searchParams }: Props) {
  const where = {
    isActive: true,
    ...(searchParams.q && {
      name: { contains: searchParams.q, mode: "insensitive" as const },
    }),
    ...(searchParams.category && {
      category: { slug: searchParams.category },
    }),
  };

  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
  const totalProducts = await prisma.product.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalProducts / LIMIT));

  if (page > totalPages) return <EmptyProductState />;

  const products = await prisma.product.findMany({
    where,
    orderBy: sortMap[searchParams.sort ?? "newest"],
    include: { category: true },
    skip: (page - 1) * LIMIT,
    take: LIMIT,
  });
  if (products.length === 0) return <EmptyProductState />;

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <ProductsPagination currentPage={page} totalPages={totalPages} />
    </>
  );
}
