import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "../shop/productCard";
import { Button } from "../ui/button";
import { prisma } from "@/lib/prisma";

export default async function NewArrivals() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return (
    <section className="mt-20">
      <h2 className="text-3xl font-semibold">New Arrivals</h2>
      <div className="flex items-center mt-1 justify-between text-muted-foreground">
        <p className=" font-light">Fresh picks from our latest collection </p>

        <Button variant="link" asChild>
          <Link href="/shop">
            ViewShop <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-7 mt-10  ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
