"use client";
import { addToCart } from "@/actions/cart.actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function AddToCartButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const addtoCarta = () => {
    startTransition(async () => {
      try {
        const res = await addToCart(id);
        if (res) {
          toast.success("Success");
        }
      } catch {
        toast.error("somthing went wrong");
      }
    });
  };
  return (
    <Button
      onClick={addtoCarta}
      size={"lg"}
      className="cursor-pointer max-w-50 h-16 rounded-none text-lg"
    >
      {isPending ? "loading" : "ADD TO CART"}
    </Button>
  );
}
