"use server";
import { prisma } from "@/lib/prisma";
import { adminProductSchema } from "@/lib/schema";
import {
  requireUserId,
  slugify,
  validateProductConstraints,
} from "@/lib/utils";
import { AdminProductFormType } from "@/types";

export async function createProduct(data: AdminProductFormType) {
  try {
    requireUserId();
    const result = adminProductSchema.safeParse(data);

    if (!result.success) {
      return { success: false, message: "input incorrect" };
    }
    const { name, price, stock, description, image, categoryId } = result.data;
    const slug = slugify(name);

    const validationError = await validateProductConstraints(slug, categoryId);
    if (validationError) {
      return validationError;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        stock,
        description,
        slug,
        categoryId,
        images: [image],
      },
    });
    return { success: true, message: "Product created", product };
  } catch (error) {
    console.error("[createProduct]", error);
    return { success: false, message: "Failed to create product" };
  }
}

export async function updateProduct(id: string, data: AdminProductFormType) {
  return { success: true, message: "hoora" };
}
