"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function addToCart(productId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return {
        success: false,
        message: "Please sign in to add items to your cart.",
      };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return { success: false, message: "Product not found." };
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (cartItem && cartItem.quantity >= product.stock) {
      return { success: false, message: "Maximum available quantity reached." };
    }
    const result = await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: { quantity: { increment: 1 } },
      create: { userId, productId, quantity: 1 },
    });
    return {
      success: true,
      cartItem: result,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
