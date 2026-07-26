"use server";

import { prisma } from "@/lib/prisma";
import { UserAccountFormSchema } from "@/lib/schema";
import { requireAdmin, requireUser } from "@/lib/utils";
import { UserFormValues } from "@/types";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
export type StateAction = {
  status: boolean;
  message?: string;
};
export async function updateUserAccountInfo(data: UserFormValues) {
  try {
    const user = await requireUser();
    const validatedFields = UserAccountFormSchema.safeParse(data);

    if (!validatedFields.success) {
      throw new Error("Validation failed. Please check the fields.");
    }

    if (
      user.email === "admin@test.com" &&
      validatedFields.data.email !== user.email
    ) {
      throw new Error("This account email cannot be changed");
    }

    const { firstName, lastName, email, address, phone } = validatedFields.data;
    const fullName = `${firstName} ${lastName}`;
    await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName,
        email,
        address,
        phone,
      },
    });
    revalidatePath("/account");
    return {
      success: true,
      message: "Account info updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
    };
  }
}
export async function updateRole(userId: string, role: UserRole) {
  try {
    await requireAdmin();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.email === "admin@test.com") {
      throw new Error("This account cannot be modified");
    }
    const res = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User role updated successfully.",
      role: res.role,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update user role.",
    };
  }
}
