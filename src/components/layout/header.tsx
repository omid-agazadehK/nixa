import { auth } from "@/auth";
import { LogIn, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import AccountActions from "../accountActions";
import Logo from "../logo";
import NavLinks from "../navLinks";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default async function Header() {
  const session = await auth();
  return (
    <header className="border-border bg-background/20 sticky top-0 z-50 hidden w-full border-b px-2 backdrop-blur-lg sm:block">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-x-10">
          <Logo variant="small" />
          <NavLinks />
        </div>
        <div className="flex items-center gap-x-3">
          <Button variant="outline" size="icon-lg" asChild>
            <Link href="/cart">
              <ShoppingCart fill="" />
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
