import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LogIn, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import AccountActions from "../accountActions";
import Logo from "../logo";
import NavLinks from "../navLinks";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default async function Header() {
  const session = await auth();
  const userId = session?.user?.id;

  const cartQuantity = userId
    ? await prisma.cartItem.aggregate({
        where: { userId },
        _sum: {
          quantity: true,
        },
      })
    : null;
  const cartItemsCount = cartQuantity?._sum.quantity ?? 0;

  return (
    <header className="border-border bg-background/20 sticky top-0 z-50 hidden w-full border-b px-2 backdrop-blur-lg sm:block">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-x-10">
          <Logo variant="small" />
          <NavLinks />
        </div>
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
          {!session?.user && (
            <div className="flex items-center gap-x-2">
              <Button variant="outline" asChild size={"lg"}>
                <Link href={"/login"}>
                  <LogIn />
                  Login
                </Link>
              </Button>
              <Button asChild size={"lg"}>
                <Link href={"/signup"}>
                  <User />
                  SignUp
                </Link>
              </Button>
            </div>
          )}
          {session?.user && <AccountActions user={session.user} />}
        </div>
      </div>
    </header>
  );
}
