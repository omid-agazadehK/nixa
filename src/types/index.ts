import {
  adminProductSchema,
  checkoutSchema,
  loginSchema,
  signUpSchema,
  UserAccountFormSchema,
} from "@/lib/schema";
import { OrderStatus, Prisma } from "@prisma/client";
import z from "zod";

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
  page: string;
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

export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    user: true;
    items: { include: { product: true } };
  };
}>;

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    category: true;
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
  searchParams: Promise<{
    orderId: string;
  }>;
};
export type AdminProductFormType = z.infer<typeof adminProductSchema>;
export type UserFormValues = z.infer<typeof UserAccountFormSchema>;
export interface MobileNavRoutes {
  title: string;
  href: string;
  icon: "House" | "ShoppingBag" | "ShoppingBasket";
}
export type OrderStatusCount = {
  status: OrderStatus;
  _count: number;
};
