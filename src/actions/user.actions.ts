"use server";

import { prisma } from "@/lib/prisma";
import { UserAccountFormSchema } from "@/lib/schema";
import { requireAdmin, requireUserId } from "@/lib/utils";
import { UserFormValues } from "@/types";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
export type StateAction = {
  status: boolean;
  message?: string;
};
export async function updateUserAccountInfo(data: UserFormValues) {
  const userId = await requireUserId();
  const validatedFields = UserAccountFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check the fields.",
    };
  }
  const { firstName, lastName, email, address, phone } = validatedFields.data;
  const fullName = `${firstName} ${lastName}`;
  try {
    await prisma.user.update({
      where: { id: userId },
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
      message: "Something went wrong. Please try again later.",
    };
  }
}
export async function updateRole(userId: string, role: UserRole) {
  try {
    await requireAdmin();

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
    console.error("UPDATE_ROLE_ERROR:", error);

    return {
      success: false,
      message: "Failed to update user role.",
    };
  }
}
