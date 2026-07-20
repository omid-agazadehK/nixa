"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Ellipsis, LogOut, User } from "lucide-react";
import Link from "next/link";
export default function MoreSheet() {
  return (
    <div className="hover: col-span-1 flex h-full w-full flex-col items-center justify-center ">
      <Sheet>
        <SheetTrigger className="flex flex-col items-center gap-1 text-muted-foreground">
          <Ellipsis size={20} strokeWidth={1.5} />
          more
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
            <Separator />
            <span className="flex items-center gap-x-2">
              <LogOut className="text-muted-foreground" />
              sign out
            </span>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
