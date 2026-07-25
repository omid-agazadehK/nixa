import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getProductBySlug = cache(async (slug: string) => {
  return prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
    },
    include: {
      category: true,
    },
  });
});
