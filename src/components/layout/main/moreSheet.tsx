"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Ellipsis, Info, Phone } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

const moreMenuItems = [
  {
    label: "About us",
    href: "/about",
    icon: Info,
  },
  {
    label: "Contact us",
    href: "/contact",
    icon: Phone,
  },
];

export default function MoreSheet() {
  const [open, setOpen] = useState(false);

  return (
    <div className="col-span-1 flex h-full w-full flex-col items-center justify-center ">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex flex-col items-center gap-1 text-muted-foreground">
          <Ellipsis size={20} strokeWidth={1.5} />
          more
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>More</SheetTitle>
            <SheetDescription>Explore more options</SheetDescription>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-y-3 px-4 text-lg">
            {moreMenuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Fragment key={item.href} >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-x-2 px-4 py-3 text-sm transition-colors hover:text-foreground"
                  >
                    <Icon
                      size={20}
                      className="text-muted-foreground"
                      strokeWidth={1.5}
                    />
                    {item.label}
                  </Link>
                  <Separator />
                </Fragment>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
