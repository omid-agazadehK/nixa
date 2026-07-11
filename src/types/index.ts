import { checkoutSchema, loginSchema, signUpSchema } from "@/lib/schema";
import { Prisma } from "@prisma/client";
import z from "zod";

export type Product = {
  category: Category;
  categoryId: string;
  createdAt: Date;
  description: string;
  id: string;
  images: string[];
  name: string;
  price: number;
  slug: string;
  stock: number;
};
//
export type Category = { id: string; name: string; slug: string };
//
export type SortOption = {
  price?: "asc" | "desc";
  createdAt?: "desc";
};
//
export type ShopSearchParams = {
  sort?: SortKey;
  category?: string;
  q?: string;
};
export type SortKey = "price-asc" | "price-desc" | "newest";
//
export type SignUpFormData = z.infer<typeof signUpSchema>;

export type LoginForm = z.infer<typeof loginSchema>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: {
      include: {
        category: true;
      };
    };
  };
}>;
export type CartControlItem = Prisma.CartItemGetPayload<{
  select: {
    id: true;
    quantity: true;
  };
}>;
export type CheckOutForm = z.infer<typeof checkoutSchema>;
export type SuccessSearchParams = {
  searchParams: { orderId: string };
};
