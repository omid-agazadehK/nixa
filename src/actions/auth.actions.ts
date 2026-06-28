"use server";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/schema";
import { SignUpFormData } from "@/types";
import bcrypt from "bcryptjs";

export const signUp = async (formData: SignUpFormData) => {
  try {
    const parsed = signUpSchema.safeParse(formData);
    if (!parsed.success) {
      return { status: "fail", errors: parsed.error.flatten().fieldErrors };
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
