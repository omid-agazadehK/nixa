import CheckoutForm from "./checkoutForm";
import OrderSummary from "./orderSummary";

export default function CheckoutpView() {
  return (
    <section className="grid grid-cols-12 gap-5">
      <CheckoutForm />
      <OrderSummary />
    </section>
  );
}
