"use client";
import { updateRole } from "@/actions/user.actions";
import { UserRole } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function AdminUserActions({ userId }: { userId: string }) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const router = useRouter();
  const { update } = useSession();
  const updateRoleHanler = async () => {
    if (!selectedRole) return;
    const result = await updateRole(userId, selectedRole);
    console.log(result);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    try {
      await update({
        role: result.role,
      });
      router.refresh();
      toast.success(result.message);
    } catch {
      toast.error("User role updated, but session refresh failed");
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Change Role</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setSelectedRole(UserRole.USER)}>
              Set as User
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedRole(UserRole.ADMIN)}>
              Set as Admin
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={selectedRole !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedRole(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change User Role?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change this user&lsquo;s role? This will
              immediately update their access permissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedRole(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={updateRoleHanler}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
