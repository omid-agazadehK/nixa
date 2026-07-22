import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Separator } from "../ui/separator";

export default async function OrderSummary() {
  const session = await auth();
  const userId = session?.user?.id;
  const cartItem = await prisma.cartItem.findMany({
    include: {
      product: true,
    },
    where: {
      userId: userId,
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="bg-card border col-span-12 rounded-2xl order-1 md:order-2 w-full md:col-span-6 py-4 h-fit px-6">
      <h3 className="text-2xl  font-fraunces">Order Summary</h3>
      <div className="flex flex-col gap-4 py-4 text-sm">
        <div className="divide-y divide-dashed text-base">
          {cartItem.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="flex items-center w-full justify-between gap-4 "
            >
              <div className="flex items-center gap-4">
                <div className="relative size-20  text-xs">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="rounded-xl object-cover"
                  />
                </div>
                <div className="space-y-1 py-3">
                  <p className="font-medium md:text-base text-sm">
                    {item.product.name}
                  </p>
                  <p className="font-medium text-muted-foreground ">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold">x{item.quantity}</p>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-normal">
            $
            {cartItem
              .reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0,
              )
              .toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated shipping</span>
          <span className="font-normal">Free</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="font-medium">Total </span>
          <span className="text-lg font-medium">
            $
            {cartItem
              .reduce(
                (sum, item) => sum + item.quantity * item.product.price,
                0,
              )
              .toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
