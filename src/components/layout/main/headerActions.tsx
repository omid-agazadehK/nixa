import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { ShoppingCart, UserRoundCog } from "lucide-react";
import Link from "next/link";
import AccountActions from "./accountActions";
import AuthButtons from "./authButtons";

export default async function HeaderActions() {
  const session = await auth();
  const user = session?.user;

  const cartQuantity = user?.id
    ? await prisma.cartItem.aggregate({
        where: { userId: user?.id },
        _sum: {
          quantity: true,
        },
      })
    : null;
  const cartItemsCount = cartQuantity?._sum.quantity ?? 0;

  return (
    <div className="flex items-center gap-x-3">
      <Button variant="outline" className="relative" size="icon-lg" asChild>
        <Link href="/cart">
          <ShoppingCart fill="" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {cartItemsCount}
            </span>
          )}
        </Link>
      </Button>
      <Separator orientation="vertical" />
      {!user ? <AuthButtons /> : <AccountActions user={user} />}
      {user?.role === UserRole.ADMIN && (
        <Button asChild size="icon-lg">
          <Link href="/admin/dashboard">
            <UserRoundCog />
          </Link>
        </Button>
      )}
    </div>
  );
}
