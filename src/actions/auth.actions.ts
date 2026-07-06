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
      return {
        success: false,
        message: "Invalid form data. Please refresh and try again.",
      };
    }
    const { email, password, name, lastName } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      return { status: "fail", message: "this email is already in use" };

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
    console.error("SIGNUP_ERROR", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }
};

export const logIn = async (formData: LoginForm) => {
  const parsed = loginSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data. Please refresh and try again.",
    };
  }
  const { email, password } = parsed.data;

  try {
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
          return { success: false, error: "Invalid email or password" };
        default:
          return {
            success: false,
            error: "Something went wrong. Please try again.",
          };
      }
    }

    throw error;
  }
};
export const logout = async () => {
  try {
    await signOut({ redirectTo: "/login" });
    return { success: true }; // never actually reached — signOut always redirects on success
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
