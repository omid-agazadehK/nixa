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
    <section>
      <div className="grid  grid-cols-12 relative gap-x-10 bg-card  rounded-2xl shadow  overflow-hidden">
        <div className="sticky sm:h-100 h-80 lg:h-auto lg:col-span-5 col-span-12 md:left-0 top-0 object-cover">
          <Image
            src={product?.images[0]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            alt={product.name}
          />
        </div>
        <div className="flex p-4 lg:col-span-7 col-span-12 flex-col md:gap-5 gap-3 w-full ">
          <div>
            <h2 className="md:text-2xl text-xl mb-4 font-bold ">{product.name}</h2>
            <Badge variant={"secondary"}>{product.category.name}</Badge>
          </div>
          <Separator />
          <div className="flex flex-col gap-y-5">
            <span className=" text-base md:text-lg">DESCRIPTION</span>
            <span className="mdLtext-base text-sm">{product.description}</span>
          </div>
          <Separator />

          <div className="flex flex-col gap-y-5">
            <span className="tracking-wide text-sm md:text-base">PRICE</span>
            <span className="md:text-4xl text-2xl font-bold ">
              ${product.price.toFixed(2)}
            </span>
          </div>
          {!cartItem && <AddToCartButton id={product.id} />}
          <div className=" flex items-center gap-4">
            {cartItem && <CartControls item={cartItem} />}
          </div>
        </div>
      </div>
    </section>
  );
}
