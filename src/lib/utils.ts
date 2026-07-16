import { auth } from "@/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "./prisma";
import { UserRole } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function requireUserId() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== UserRole.ADMIN) {
    throw new Error("Forbidden");
  }

  return session.user;
}

export function formatDate(date: unknown) {
  if (!(date instanceof Date) && typeof date !== "string") {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(slug: string) {
  return slug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function validateProductConstraints(
  slug: string,
  categoryId: string,
  productId?: string,
) {
  const [existingProduct, category] = await Promise.all([
    prisma.product.findFirst({
      where: {
        slug,
        ...(productId && {
          NOT: {
            id: productId,
          },
        }),
        isActive: true,
      },
      select: { id: true },
    }),
    prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    }),
  ]);

  if (existingProduct) {
    return { success: false, message: "Product with this name already exists" };
  }

  if (!category) {
    return { success: false, message: "Category not found" };
  }

  return null;
}

export function matchesRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname.startsWith(route));
}
