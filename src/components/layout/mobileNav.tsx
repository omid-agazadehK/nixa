import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Ellipsis,
  House,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import Logo from "../logo";
export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0  w-full bg-background border-t border-border z-50">
      <div className="grid grid-cols-4 gap-x-1 place-items-center w-full p-2 font-light text-xs">
        <Link
          href={"/"}
          className="col-span-1  w-full flex flex-col items-center justify-center gap-y-1  rounded-sm hover:"
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
          className="col-span-1  w-full flex flex-col items-center justify-center  gap-y-1 rounded-sm hover:"
        >
          <ShoppingBag
            size={20}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
          Shop
        </Link>

        <Sheet>
          <SheetTrigger>
            <div className="col-span-1 w-full flex flex-col items-center justify-center gap-y-1 rounded-sm ">
              <Ellipsis
                size={20}
                strokeWidth={1.5}
                className="text-muted-foreground"
              />
              More
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <Logo variant="large" />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-y-3 mt-4 px-4 text-lg">
              <Link href={"/cart"} className="flex items-center gap-x-2">
                <ShoppingCart />
                cart
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="col-span-1  h-full w-full flex flex-col items-center justify-center rounded-sm hover: ">
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
                    <div className="flex flex-col ">
                      <span className="text-foreground ">omid agazadeh</span>
                      <span className="text-sm font-light">
                        omidagazadeh.dev@gmail.com
                      </span>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-y-3 mt-4 px-4 text-lg">
                <Link href={"/cart"} className="flex items-center gap-x-2">
                  <User />
                  Account settings
                </Link>
                <DropdownMenuSeparator />
                <Link href={"/cart"} className="flex items-center gap-x-2">
                  <LogOut className="text-muted-foreground" />
                  sign out
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
