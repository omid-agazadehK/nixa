"use client";
import { logout } from "@/actions/auth.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { House, LogOut, ShoppingBag, ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";
export default function MobileNav() {
  const signOutHandler = async (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    await logout();
  };
  return (
    <div className="bg-background border-border fixed bottom-0 z-50 w-full border-t sm:hidden">
      <div className="grid w-full grid-cols-4 place-items-center gap-x-1 p-2 text-xs font-light">
        <Link
          href={"/"}
          className="hover: col-span-1 flex w-full flex-col items-center justify-center gap-y-1 rounded-sm"
        >
          <House
            size={20}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
          Home
        </Link>
        <Link
          href={"/shop"}
          className="hover: col-span-1 flex w-full flex-col items-center justify-center gap-y-1 rounded-sm"
        >
          <ShoppingBag
            size={20}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
          Shop
        </Link>

        <Link
          href="/card"
          className="col-span-1 flex w-full flex-col items-center justify-center gap-y-1 rounded-sm"
        >
          <ShoppingBasket
            size={20}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
          Card
        </Link>
        <div className="hover: col-span-1 flex h-full w-full flex-col items-center justify-center rounded-sm">
          <Sheet>
            <SheetTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <div>
                    <Avatar size="lg">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-foreground">omid agazadeh</span>
                      <span className="text-sm font-light">
                        omidagazadeh.dev@gmail.com
                      </span>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-y-3 px-4 text-lg">
                <Link href={"/cart"} className="flex items-center gap-x-2">
                  <User />
                  Account settings
                </Link>
                <DropdownMenuSeparator />
                <span
                  onClick={(e) => signOutHandler(e)}
                  className="flex items-center gap-x-2"
                >
                  <LogOut className="text-muted-foreground" />
                  sign out
                </span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
