import { CartItemWithProduct } from "@/types";
import CartItem from "./cartItem";
type Props = {
  cartItems: CartItemWithProduct[];
};
export default function CartItems({ cartItems }: Props) {
  return (
    <div className="flex flex-col items-center mt-4 md:mt-0  order-2 md:order-1 xl:col-span-8 md:col-span-7 col-span-12 gap-4 w-full ">
      <div className="flex flex-col gap-y-2 w-full col-span-4">
        <h4 className="text-xl font-semibold">Cart Item</h4>
        <span className="text-sm text-muted-foreground">
          Review your items before checkout
        </span>
      </div>
      {cartItems.length > 0 ? (
        <div className="space-y-4 w-full">
          {cartItems.map((Item) => (
            <CartItem key={Item.id} item={Item} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-2xl font-bold">
          Your cart is empty. Add some items to get started!
        </p>
      )}
    </div>
  );
}
