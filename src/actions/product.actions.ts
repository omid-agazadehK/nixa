"use server";
import { prisma } from "@/lib/prisma";
import { adminProductSchema } from "@/lib/schema";
import { requireAdmin, slugify, validateProductConstraints } from "@/lib/utils";
import { AdminProductFormType } from "@/types";
import { revalidatePath } from "next/cache";

export async function createProduct(data: AdminProductFormType) {
  try {
    await requireAdmin();

    const result = adminProductSchema.safeParse(data);

    if (!result.success) {
      return { success: false, message: "Invalid form data." };
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
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true, message: "Product created successfully.", product };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Failed to create the product.",
    };
  }
}

export async function updateProduct(id: string, data: AdminProductFormType) {
  try {
    await requireAdmin();
    const result = adminProductSchema.safeParse(data);

    if (!result.success) {
      return { success: false, message: "input incorrect" };
    }
    const { name, price, stock, description, image, categoryId } = result.data;
    const slug = slugify(name);

    const validationError = await validateProductConstraints(
      slug,
      categoryId,
      id,
    );
    if (validationError) {
      return validationError;
    }

    const res = await prisma.product.update({
      where: { id },
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
    revalidatePath("/admin/products");
    revalidatePath("/shop");

    return {
      success: true,
      message: "Product updated successfully.",
      product: res,
    };
  } catch {
    return { success: false, message: "Failed to update product." };
  }
}
export async function deleteProduct(id: string) {
  try {
    await requireAdmin();

    const res = await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
    revalidatePath("/admin/products");
    revalidatePath("/shop");

    return { success: true, message: "Product deleted successfully.", res };
  } catch {
    return { success: false, message: "Failed to delete product." };
  }
}
