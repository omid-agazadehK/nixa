import CartView from "@/components/cart/cartView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cart",
};
export default function CartPage() {
  return <CartView />;
}
