"use server";

import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string) {
  try {
    const userId = await requireUserId();

    const product = await prisma.product.findFirst({
      where: { id: productId, isActive: true },
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
    revalidatePath("/products/[slug]");
    return {
      success: true,
      message: "Item added to cart successfully.",
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

export async function removeFromCart(cartItemId: string) {
  try {
    const userId = await requireUserId();

    await prisma.cartItem.deleteMany({
      where: {
        id: cartItemId,
        userId,
      },
    });

    revalidatePath("/cart");

    return {
      success: true,
      message: "Item removed from cart successfully.",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Please sign in to remove items from your cart.",
    };
  }
}
export async function incrementFromCart(cartItemId: string) {
  try {
    const userId = await requireUserId();

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: true },
    });
    if (!cartItem || cartItem.userId !== userId) {
      return {
        success: false,
        message: "Cart item not found.",
      };
    }
    if (cartItem.quantity >= cartItem.product.stock) {
      return {
        success: false,
        message: "Maximum available quantity reached.",
      };
    }

    const result = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: { increment: 1 } },
    });
    revalidatePath("/cart");

    return {
      success: true,
      message: "Item quantity updated successfully.",
      cartItem: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
export async function decrementFromCart(cartItemId: string) {
  try {
    const userId = await requireUserId();

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
    if (!cartItem || cartItem.userId !== userId) {
      return {
        success: false,
        message: "Cart item not found.",
      };
    }
    if (cartItem.quantity <= 1) {
      return {
        success: false,
        message: "Minimum quantity reached. Remove the item instead.",
      };
    }
    const result = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: { decrement: 1 } },
    });
    revalidatePath("/cart");
    return {
      success: true,
      message: "Item quantity updated successfully.",
      cartItem: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
