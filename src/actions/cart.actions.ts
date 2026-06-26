"use server";

import { prisma } from "@/lib/prisma";

export async function addToCart(productId: string) {
  const order = await prisma.cartItem.findMany();
  const product = await prisma.product.findUnique({ where: { id: productId } });
  console.log(productId);
  return {
    productId: productId,
    order,
  };
}
