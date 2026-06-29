import z from "zod";
const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const signUpSchema = z.object({
  email: z.string().regex(emailRegex, "pls enter a vaild email address").trim(),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
  name: z.string().max(10, "Name must be at most 10 characters"),
  lastName: z.string().max(10, "Last name must be at most 10 characters"),
});

export const loginSchema = z.object({
  email: z.string().regex(emailRegex, "pls enter a vaild email address").trim(),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
});
