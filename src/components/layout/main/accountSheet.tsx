"use client";

import { logout } from "@/actions/auth.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, TableProperties, User } from "lucide-react";
import { User as UserType } from "next-auth";
import Link from "next/link";
import { useState } from "react";
const accountLinks = [
  {
    label: "Profile",
    href: "/account",
    icon: User,
  },
  {
    label: "Orders",
    href: "/account/orders",
    icon: TableProperties,
  },
];
export default function AccountSheet({ user }: { user: UserType }) {
  const [isOpen, setIsOpen] = useState(false);
  const signOutHandler = async () => {
    setIsOpen(false);
    await logout();
  };
  return (
    <div className="col-span-1 flex h-full w-full flex-col items-center justify-center ">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>
              {user.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Account</SheetTitle>
          </SheetHeader>
          <div className="px-8">
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {user.fullName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-foreground text-lg">{user.fullName}</p>
              <p className="text-sm font-light">{user.email}</p>
            </div>
          </div>
          <div className="my-4 flex flex-col gap-y-1 px-4 text-lg">
            {accountLinks.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-x-2 px-4 py-3 text-sm transition-colors hover:text-foreground"
                  >
                    <Icon size={16} className="text-muted-foreground" />
                    {item.label}
                  </Link>
                  <Separator />
                </div>
              );
            })}

            <Button
              onClick={signOutHandler}
              variant="destructive"
              className="mt-2 py-4"
            >
              <LogOut size={16} />
              Sign out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
