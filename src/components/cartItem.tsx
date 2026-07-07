"use client";

import {
  decrementFromCart,
  incrementFromCart,
  removeFromCart,
} from "@/actions/cart.actions";
import { CartItemWithProduct } from "@/types";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Spinner } from "./ui/spinner";

export default function CartItem({ item }: { item: CartItemWithProduct }) {
  const [isDeleting, startDeleting] = useTransition();
  const [isIncrementing, startIncrementing] = useTransition();
  const [isDecrementing, startDecrementing] = useTransition();
  const removeHandler = (cartItemId: string) => {
    if (!cartItemId) return;
    startDeleting(async () => {
      const result = await removeFromCart(cartItemId);
      if (result.success) {
        toast.success(result.message);
        return;
      }
      toast.error(result.message);
    });
  };
  const incrementHandler = (cartItemId: string) => {
    if (!cartItemId) return;
    startIncrementing(async () => {
      const result = await incrementFromCart(cartItemId);
      if (result.success) {
        toast.success(result.message);
        return;
      }
      toast.error(result.message);
    });
  };
  const decrementHandler = (cartItemId: string) => {
    if (!cartItemId) return;
    startDecrementing(async () => {
      const result = await decrementFromCart(cartItemId);
      if (result.success) {
        toast.success(result.message);
        return;
      }
      toast.error(result.message);
    });
  };
  return (
    <div
      key={item.id}
      className="flex flex-col gap-4 bg-card p-4 border rounded-md"
    >
      <div className="flex items-start gap-x-4">
        <div className="aspect-square w-1/4 max-w-25  overflow-hidden rounded-md">
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            height={100}
            width={100}
          />
        </div>
        <div className="flex flex-col items-start gap-y-3">
          <h4 className="text-lg font-semibold">{item.product.name}</h4>
          <Badge>{item.product.category.name}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4">
        <Separator className="col-span-8" />
        <div className="col-span-4 flex flex-col gap-y-1">
          <span>Price</span>
          <span className="text-sm text-muted-foreground">
            ${item.product.price.toFixed(2)}
          </span>
        </div>

        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={() => removeHandler(item.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Removing..." : "Remove"}
        </Button>
        <Button
          variant="destructive"
          size={"icon"}
          className="cursor-pointer"
          onClick={() => incrementHandler(item.id)}
          disabled={isIncrementing}
        >
          {isIncrementing ? <Spinner /> : "+"}
        </Button>
        {item.quantity}
        <Button
          variant="destructive"
          size={"icon"}
          className="cursor-pointer"
          onClick={() => decrementHandler(item.id)}
          disabled={isDecrementing}
        >
          {isDecrementing ? <Spinner /> : "-"}
        </Button>
      </div>
    </div>
  );
}
