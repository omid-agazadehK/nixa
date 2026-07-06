import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function CartView() {
  const session = await auth();
  const user = session?.user;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: user?.id },
    include: { product: true },
  });
  console.log(cartItems);
  return <div>cardView</div>;
}
