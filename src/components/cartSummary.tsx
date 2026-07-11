import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

import { CartItemWithProduct } from "@/types";

type Props = {
  cartItems: CartItemWithProduct[];
};

export default function CartSummary({ cartItems }: Props) {
  const subtotal = cartItems
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);
  console.log({ cartItems, sd: cartItems.length === 0 });
  return (
    <div className="xl:col-span-4 order-1 md:order-2 md:col-span-5 col-span-12  bg-card sm:py-6 py-4 px-5 sm:px-10 rounded-md border drop-shadow-md h-fit flex flex-col md:gap-y-8 gap-4">
      <h5 className="text-2xl font-semibold">Order Summary</h5>
      <div className="flex flex-col gap-y-2 font-light text-sm">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-normal">${subtotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated shipping</span>
          <span className="font-normal">Free</span>
        </div>
        <div className="flex items-center justify-between">
          <span>taxes</span>
          <span className="font-normal">Calculated at checkout</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Total </span>
          <span className="text-2xl font-bold">${subtotal}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          Shipping and taxes calculated at checkout
        </span>
      </div>
      {cartItems.length <= 0 ? (
        <Button disabled className="h-10">
          Proceed to Checkout
        </Button>
      ) : (
        <Button className="h-10" asChild>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      )}
    </div>
  );
}
