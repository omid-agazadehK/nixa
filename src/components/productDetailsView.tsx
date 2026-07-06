import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "./addToCartButton";
import { Badge } from "./ui/badge";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";

export default async function ProductDetailsView({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) notFound();
  return (
      <section className="flex gap-x-10">
        <div className="aspect-square w-2/3 object-cover max-w-lg overflow-hidden">
          <Image
            src={product?.images[0]}
            height={400}
            width={400}
            loading="eager"
            className="rounded-2xl"
            alt={product.name}
            
          />
        </div>
        <div className="flex flex-col gap-y-5 w-full">
          <div>
            <h2 className="text-4xl mb-4 font-bold ">{product.name}</h2>
            <Badge variant={"secondary"}>{product.category.name}</Badge>
          </div>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-y-5">
            <span className=" text-lg">DESCRIPTION</span>
            <span>{product.description}</span>
          </div>
          <DropdownMenuSeparator />

          <div className="flex flex-col gap-y-5">
            <span className="tracking-wide">PRICE</span>
            <span className="text-4xl font-bold ">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <AddToCartButton id={product.id} />
        </div>
      </section>
  );
}
