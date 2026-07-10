import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import CartItems from "./cartItems";
import CartSummary from "./cartSummary";

export default async function CartView() {
  const session = await auth();
  const userId = session?.user?.id;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="grid grid-cols-12 gap-x-4  mt-4 md:mt-0">
      <CartItems cartItems={cartItems} />
      <CartSummary cartItems={cartItems} />
    </section>
  );
}
