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
import { UserRole } from "@prisma/client";
import { LogOut, TableProperties, User } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";

export default function ProfileSheet({
  user,
}: {
  user: {
    id: string;
    role: UserRole;
    fullName: string;
    email: string;
  };
}) {
  console.log(user);
  const signOutHandler = async (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    await logout();
  };
  return (
    <div className="hover: col-span-1 flex h-full w-full flex-col items-center justify-center ">
      <Sheet>
        <SheetTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
                  <span className="text-foreground">{user.fullName}</span>
                  <span className="text-sm font-light">{user.email}</span>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col my-4 px-4 text-lg ">
            <Link
              href={"/profile"}
              className="flex items-center py-3 gap-x-2 px-4 text-sm"
            >
              <User size={16} className="text-muted-foreground" />
              Profile
            </Link>
            <Separator/>
            <Link
              href={"/profile/order"}
              className="flex items-center py-3 gap-x-2 px-4 text-sm"
            >
              <TableProperties size={16} className="text-muted-foreground" />
              Order
            </Link>
            <Separator/>

            <Button
              onClick={(e) => signOutHandler(e)}
              variant="destructive"
              className=" py-4 mt-2"
            >
              <LogOut size={16}  />
              sign out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
