import { auth } from "@/auth";
import { LogIn } from "lucide-react";
import Link from "next/link";
import AccountActions from "../accountActions";
import Logo from "../logo";
import NavLinks from "../navLinks";
import { Button } from "../ui/button";

export default async function Header() {
  const session = await auth();
  return (
    <header className="border-border bg-background/20 sticky top-0 z-50 hidden w-full border-b px-2 backdrop-blur-lg sm:block">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
        <Logo variant="small" />
        <div className="flex items-center gap-x-6">
          <NavLinks />
          {session && (
            <Button variant={"ghost"} asChild>
              <Link href={"login"}>
                <LogIn />
              </Link>
            </Button>
          )}
          {session?.user && <AccountActions user={session.user} />}
        </div>
      </div>
    </header>
  );
}
