import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Category from "./category";
import SearchInput from "./searchInput";
import SortBy from "./sortBy";

export default async function Products({
  searchParams,
}: {
  searchParams: { sort?: string; category?: string; q?: string };
}) {
  const sortMap: Record<string, any> = {
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
    },
    orderBy: sortMap[searchParams.sort ?? "newest"],
    include: { category: true },
  });
  const moz = await prisma.category.findMany();
  console.log(moz);
  return (
    <div className="flex gap-x-12 md:mt-20 mt-5">
      <SortBy />
      <div className="grid w-full md:grid-cols-2  grid-cols-1 gap-x-10 gap-y-5  xl:px-0 sm:px-10 px-5">
        <div className="col-span-2  flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Shop</h3>
            <span className="text-sm font-light">
              Browse our full collection
            </span>
          </div>
          <SearchInput />
        </div>
        <div className="col-span-2">
          <Category />
        </div>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="col-span-1"
          >
            <Card className="col-span-1 drop-shadow-sm shadow-muted-foreground shadow relative cursor-pointer duration-200 transition-all hover:scale-101  border border-border hover:bg-muted/50">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={400}
                height={400}
                className="relative  aspect-video w-full object-cover "
              />
              <CardHeader>
                <Badge variant={"secondary"} className="absolute top-2 left-2">
                  {product.category.name}
                </Badge>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Price</span>
                  <span className="font-light">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
