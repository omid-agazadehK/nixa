"use server";

import { prisma } from "@/lib/prisma";

export const signUp = async (inputData) => {
  const user = await prisma.user.findUnique({
    where: { email: inputData.email },
  });
  if (user)
    return { status: "fail", message: "there is email with that name brah" };
  const addUser = await prisma.user.create({
    data: {
      email: inputData.email,
      password: inputData.password,
    },
  });
  return { inputData: addUser };
};
