import { auth } from "@/auth";
import AccountView from "@/components/account/accountView";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });
  if (!user) {
    notFound();
  }
  return <AccountView user={user} />;
}
