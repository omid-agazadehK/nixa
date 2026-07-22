"use server";

import { prisma } from "@/lib/prisma";
import { UserAccountFormSchema } from "@/lib/schema";
import { requireUserId } from "@/lib/utils";
import { UserFormValues } from "@/types";
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
