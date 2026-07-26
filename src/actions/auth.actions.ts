"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema, signUpSchema } from "@/lib/schema";
import { LoginForm, SignUpFormData } from "@/types";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const signUp = async (formData: SignUpFormData) => {
  try {
    const parsed = signUpSchema.safeParse(formData);
    if (!parsed.success) {
      throw new Error("Invalid form data. Please refresh and try again.");
    }
    const { email, password, name, lastName } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("This email is already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName: `${name} ${lastName}`,
        email,
        password: hashedPassword,
      },
    });

    return {
      status: "success",
      data: {
        id: newUser.id,
        email: newUser.email,
      },
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
};

export const logIn = async (formData: LoginForm) => {
  try {
    const parsed = loginSchema.safeParse(formData);
    if (!parsed.success) {
      throw new Error("Invalid form data. Please refresh and try again.");
    }
    const { email, password } = parsed.data;

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password." };
        default:
          return {
            success: false,
            message: error.message || "Something went wrong. Please try again.",
          };
      }
    }

    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut({ redirectTo: "/login" });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
};
