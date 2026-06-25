import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import Logo from "../logo";
import NavLinks from "../navLinks";
export default function Header() {
  return (
    <header className="border-b hidden backdrop-blur-lg  md:block border-border w-full px-2 sticky top-0 bg-background/20 z-50">
      <div className="max-w-7xl h-14 flex items-center mx-auto justify-between">
        <Logo variant="small" />
        <div className="flex items-center gap-x-6 ">
          <NavLinks />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-65 p-2 mt-4">
              <DropdownMenuGroup className="flex items-center justify-center ">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <DropdownMenuLabel className="text-foreground py-0.5">
                    omid agazadeh
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className=" py-0.5">
                    omidagazadeh.dev@gmail.com
                  </DropdownMenuLabel>
                </div>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={"/cart"} className="flex items-center gap-x-2">
                    <User />
                    Account settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                  <LogOut className="text-muted-foreground" />
                  sign out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
