"use client";
import { logout } from "@/actions/auth.actions";
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
import { Loader2, LogOut, User } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { MouseEvent, useTransition } from "react";
import { toast } from "sonner";

export default function AccountActions({
  user,
}: {
  user: NonNullable<Session["user"]>;
}) {
  const [isPending, startTransition] = useTransition();
  const signOutHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await logout();
      if (!res.success) toast.error(res.message);
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-4 w-65 p-2">
        <DropdownMenuGroup className="flex items-center justify-start">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <DropdownMenuLabel className="text-foreground py-0.5">
              {user.name}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="py-0.5">
              {user.email}
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
          <DropdownMenuItem
            onClick={(e) => signOutHandler(e)}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin text-muted-foreground" />
            ) : (
              <LogOut className="text-muted-foreground" />
            )}

            {isPending ? "Signing out..." : "Sign out"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
