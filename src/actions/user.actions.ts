"use server";

import { prisma } from "@/lib/prisma";
import { UserProfileFormSchema } from "@/lib/schema";
import { requireUserId } from "@/lib/utils";
import { UserFormValues } from "@/types";
export type StateAction = {
  status: boolean;
  message?: string;
};
export async function updateUserProfile(data: UserFormValues) {
  const userId = await requireUserId();
  const validatedFields = UserProfileFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check the fields.",
    };
  }
  const { firstName, lastName, email, address, phone } = validatedFields.data;
  const fullName=`${firstName} ${lastName}`
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

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
