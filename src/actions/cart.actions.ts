"use server";

import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string) {
  try {
    const userId = await requireUserId();
    const product = await prisma.product.findFirst({
      where: { id: productId, isActive: true },
      orderBy: { createdAt: "desc" },
    });
    if (!product) {
      throw new Error("Product not found.");
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (product.stock <= 0) {
      throw new Error("Out of stock.");
    }
    if (cartItem && cartItem.quantity >= product.stock) {
      throw new Error("You've reached the maximum available quantity.");
    }
    const result = await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: { quantity: { increment: 1 } },
      create: { userId, productId, quantity: 1 },
    });
    revalidatePath(`/products/${product.slug}`);
    revalidatePath(`/products`);
    revalidatePath(`/cart`);
    return {
      success: true,
      message: "Item added to cart successfully.",
      cartItem: result,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
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
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
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
      throw new Error("Cart item not found.");
    }
    if (cartItem.quantity >= cartItem.product.stock) {
      throw new Error("You've reached the maximum available quantity.");
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
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
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
      throw new Error("Cart item not found.");
    }
    if (cartItem.quantity <= 1) {
      throw new Error("Minimum quantity reached. Remove the item instead.");
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
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
}
