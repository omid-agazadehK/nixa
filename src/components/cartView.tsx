import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import CartItems from "./cartItems";
import OrderSummary from "./orderSummary";

export default async function CartView() {
  const session = await auth();
  const user = session?.user;

  const cartItems =await prisma.cartItem.findMany({
    where: { userId: user?.id },
    include: { product: { include: { category: true } } },
  });

  return (
    <section className="grid grid-cols-12 gap-x-4  mt-4 md:mt-0">
      <CartItems cartItems={cartItems} />
      <OrderSummary cartItems={cartItems} />
    </section>
  );
}
