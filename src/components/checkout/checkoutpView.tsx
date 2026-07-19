import { Suspense } from "react";
import CheckoutForm from "./checkoutForm";
import OrderSummary from "./orderSummary";
import OrderSummarySkeleton from "./orderSummarySkeleton";

export default function CheckoutpView() {
  return (
    <section className="grid grid-cols-12 gap-5">
      <CheckoutForm />
      <Suspense fallback={<OrderSummarySkeleton />}>
        <OrderSummary />
      </Suspense>
    </section>
  );
}
