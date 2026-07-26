"use server";

import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/schema";
import { requireAdmin, requireUser } from "@/lib/utils";
import { CheckOutForm } from "@/types";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function order(formData: CheckOutForm) {
  let orderId: string | undefined;
  try {
    const user = await requireUser();
    const validatedData = checkoutSchema.safeParse(formData);
    const { success, data } = validatedData;
    if (!success) {
      throw new Error("Invalid form data. Please refresh and try again.");
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true },
    });
    const outOfStockItem = cartItems.find(
      (item) => item.quantity > item.product.stock,
    );

    if (outOfStockItem) {
      throw new Error(`${outOfStockItem.product.name} is out of stock.`);
    }
    if (cartItems.length <= 0) {
      throw new Error("Your cart is empty.");
    }
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );

    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: user.id,
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
          userId: user.id,
        },
      });
      orderId = order.id;
      return order;
    });
    revalidatePath("/");

    redirect(`/checkout/success?orderId=${orderId}`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  try {
    await requireAdmin();

    const result = await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/orders");
    return {
      success: true,
      message: `#${result.id.slice(0, 8)} updated to ${result.status.toLowerCase()}`,
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
