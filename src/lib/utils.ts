import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function requireUser() {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return session.user;
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
    throw new Error("Product with this name already exists.");
  }

  if (!category) {
    throw new Error("Category not found.");
  }

  return null;
}

export function matchesRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname.startsWith(route));
}
export function isActive(pathname: string, href: string, exact = false) {
  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
