import { CartItemWithProduct } from "@/types";
import Image from "next/image";
import CartControls from "../shared/cartControls";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export default function CartItem({ item }: { item: CartItemWithProduct }) {
  return (
    <div className="flex flex-col gap-4 bg-card p-4 border rounded-md">
      <div className="flex items-start gap-x-4">
        <div className="relative aspect-square w-1/4 max-w-25  overflow-hidden rounded-md">
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            sizes="100px"
          />
        </div>
        <div className="flex flex-col items-start gap-y-3">
          <h4 className="text-lg font-semibold">{item.product.name}</h4>
          <Badge>{item.product.category.name}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4">
        <Separator className="col-span-8" />
        <div className="col-span-4  flex flex-col gap-y-1">
          <span>Price</span>
          <span className="text-sm text-muted-foreground">
            ${item.product.price.toFixed(2)}
          </span>
        </div>
        <div className="col-span-4 flex items-center justify-end gap-2">
          <CartControls item={item} />
        </div>
      </div>
    </div>
  );
}
