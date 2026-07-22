"use client";
import { logout } from "@/actions/auth.actions";
import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";

export default function LogOutButton() {
  const [isPending, startTransition] = useTransition();
  const logOutHandler = () => {
    startTransition(async () => {
      await logout();
    });
  };
  return (
    <Button
      variant="destructive"
      className=" px-4 text-base font-medium justify-start gap-2"
      onClick={() => logOutHandler()}
      disabled={isPending}
    >
      <LogOut />
      {isPending ? "Signing out..." : "LogOut"}
    </Button>
  );
}
