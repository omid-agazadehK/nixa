"use client";
import { mobileNavRoutes } from "@/lib/constants";
import { LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AccountSheet from "./accountSheet";
import MobileNavLink from "./mobileNavLink";
import MoreSheet from "./moreSheet";

export default function MobileNav() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className="bg-background border-border fixed bottom-0 z-50 w-full border-t sm:hidden">
      <div className="grid w-full grid-cols-5 place-items-center p-0.5 gap-x-1 text-xs font-light">
        {mobileNavRoutes.map((item) => (
          <MobileNavLink key={item.href} item={item} />
        ))}
        <MoreSheet />
        {user ? (
          <AccountSheet user={user} />
        ) : (
          <Link
            href="login"
            className="flex w-full flex-col  items-center p-1 justify-center gap-y-1 rounded-lg "
          >
            <LogIn size={20} strokeWidth={1.5} />
            login
          </Link>
        )}
      </div>
    </div>
  );
}
