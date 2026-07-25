import CheckoutView from "@/components/checkout/checkoutView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};
export default function CheckoutpPage() {
  return <CheckoutView />;
}
