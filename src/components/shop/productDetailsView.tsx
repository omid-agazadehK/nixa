import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import CartControls from "../shared/cartControls";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import AddToCartButton from "./addToCartButton";

export default async function ProductDetailsView({
  params,
}: {
  params: { slug: string };
}) {
  const Session = await auth();
  const userId = Session?.user?.id;
  const product = await prisma.product.findFirst({
    where: { slug: params.slug, isActive: true },
    include: { category: true },
  });
  if (!product) notFound();
  let cartItem = null;

  if (userId) {
    cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: product.id,
        },
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });
  }
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
        <Separator />
        <div className="flex flex-col gap-y-5">
          <span className=" text-lg">DESCRIPTION</span>
          <span>{product.description}</span>
        </div>
        <Separator />

        <div className="flex flex-col gap-y-5">
          <span className="tracking-wide">PRICE</span>
          <span className="text-4xl font-bold ">
            ${product.price.toFixed(2)}
          </span>
        </div>
        {!cartItem && <AddToCartButton id={product.id} />}
        <div className=" flex items-center gap-4">
          {cartItem && <CartControls item={cartItem} />}
        </div>
      </div>
    </section>
  );
}
