"use client";
import {
  decrementFromCart,
  incrementFromCart,
  removeFromCart,
} from "@/actions/cart.actions";
import { useCartItem } from "@/hooks/useCartItem";
import { CartControlItem } from "@/types";
import { Recycle } from "lucide-react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export default function CartControls({ item }: { item: CartControlItem }) {
  const {
    isDisabled,
    isRemoving,
    isIncrementing,
    isDecrementing,
    onRemove,
    onIncrement,
    onDecrement,
  } = useCartItem();
  return (
    <>
      <Button
        variant="default"
        size={"icon"}
        className="cursor-pointer"
        onClick={() => onIncrement(() => incrementFromCart(item.id))}
        disabled={isDisabled}
      >
        {isIncrementing ? <Spinner /> : "+"}
      </Button>
      {item.quantity}
      {item.quantity > 1 && (
        <Button
          variant="default"
          size={"icon"}
          className="cursor-pointer"
          onClick={() => onDecrement(() => decrementFromCart(item.id))}
          disabled={isDisabled}
        >
          {isDecrementing ? <Spinner /> : "-"}
        </Button>
      )}
      {item.quantity <= 1 && (
        <Button
          variant="destructive"
          className="cursor-pointer"
          size={"icon"}
          onClick={() => onRemove(() => removeFromCart(item.id))}
          disabled={isDisabled}
        >
          {isRemoving ? <Spinner /> : <Recycle />}
        </Button>
      )}
    </>
  );
}
