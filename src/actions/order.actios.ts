"use server";

import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/schema";
import { requireUserId } from "@/lib/utils";
import { CheckOutForm } from "@/types";

export async function order(formData: CheckOutForm) {
  try {
    const userId = await requireUserId();
    const validatedData = checkoutSchema.safeParse(formData);
    const { success, data } = validatedData;
    if (!success) {
      return {
        success: false,
        message: "Invalid form data. Please refresh and try again.",
      };
    }
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    const outOfStockItem = cartItems.find(
      (item) => item.quantity > item.product.stock,
    );

    if (outOfStockItem) {
      return {
        success: false,
        message: `${outOfStockItem.product.name} does not have enough stock`,
      };
    }
    if (cartItems.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
      };
    }
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );
    const order = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          fullName: data.fullName,
          phone: data.phone,
          address: data.address,
          totalPrice,
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      });

      for (const item of cartItems) {
        await tx.product.update({
          where: {
            id: item.productId,
            stock: {
              gte: item.quantity,
            },
          },

          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      await tx.cartItem.deleteMany({
        where: {
          userId,
        },
      });

      return order;
    });
    return { success: true, order, message: "order done" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}
