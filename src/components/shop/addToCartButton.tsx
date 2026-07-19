"use client";
import { addToCart } from "@/actions/cart.actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function AddToCartButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const addtoCarta = () => {
    startTransition(async () => {
      const res = await addToCart(id);
      if (res.success) {
        toast.success(res.message);
        return;
      }
      toast.error(res.message);
    });
  };
  return (
    <Button
      onClick={addtoCarta}
      size={"lg"}
      className="cursor-pointer max-w-50 md:h-16 h-10 rounded-none md:text-lg text-sm"
    >
      {isPending ? <Spinner className="md:size-6 size-4" /> : "ADD TO CART"}
    </Button>
  );
}
