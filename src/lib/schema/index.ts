import z from "zod";
const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const phoneRegex = /^(09\d{9})?$/;
export const signUpSchema = z.object({
  email: z.string().regex(emailRegex, "pls enter a vaild email address").trim(),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be at most 20 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be at most 20 characters"),
});

export const loginSchema = z.object({
  email: z.string().regex(emailRegex, "pls enter a vaild email address").trim(),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
});
export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be at most 20 characters"),
  phone: z
    .string()
    .trim()
    .min(5, "Phone number is required")
    .max(15, "Name must be at most 15 characters"),
  address: z
    .string()
    .min(10, "Address is too short")
    .max(200, "Address is too long"),
});

export const adminProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().url(),
  description: z.string().min(10, "Description is too short"),
});
export const UserAccountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be at most 20 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be at most 20 characters"),
  email: z.string().regex(emailRegex, "pls enter a vaild email address").trim(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address is too long")
    .or(z.literal("")),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number (e.g., 09123456789)")
    .or(z.literal("")),
});
