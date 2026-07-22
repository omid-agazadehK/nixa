import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import CartControls from "../shared/cartControls";
import { Badge } from "../ui/badge";
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
  const isOutOfStock = product.stock <= 0;
  return (
    <section className="mt-10 flex md:flex-row flex-col  justify-between  relative gap-x-5 bg-card rounded-2xl shadow-xl overflow-hidden ">
      <div className="relative w-full md:w-2/5 lg:w-1/3 h-64 md:h-auto shrink-0">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex items-start px-4 py-10  flex-col md:gap-7 gap-3 max-w-200 w-full ">
        <Badge variant="secondary" className="text-sm uppercase font-semibold">
          {product.category.name}
        </Badge>
        <h2 className="md:text-3xl text-xl font-bold ">{product.name}</h2>
        <Badge
          className={cn(
            "rounded-full p-3.5 text-sm",
            isOutOfStock && "bg-red-300/30 text-red-700",
            !isOutOfStock && "bg-emerald-300/30 text-emerald-700",
          )}
        >
          <span
            className={cn(
              "size-2 animate-pulse rounded-full",
              isOutOfStock && "bg-red-700",
              !isOutOfStock && "bg-emerald-700",
            )}
          ></span>
          {isOutOfStock ? "Out Of Stock (Unavailable)" : "In Stock (Available)"}
        </Badge>
        <p className="font-light">{product.description}</p>

        <span className="md:text-4xl text-2xl font-extrabold ">
          ${product.price.toFixed(2)}
        </span>
        {!cartItem && (
          <AddToCartButton isDisable={isOutOfStock} id={product.id} />
        )}
        <div className=" flex items-center gap-4">
          {cartItem && <CartControls item={cartItem} />}
        </div>
      </div>
    </section>
  );
}
