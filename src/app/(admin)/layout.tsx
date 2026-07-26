import AdminSidebarContent from "@/components/layout/admin/adminSidebarContent";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Nixa Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="h-16 border-b items-start justify-center">
          <div className="flex items-center justify-between">
            <Logo />
          </div>
        </SidebarHeader>
        <AdminSidebarContent />
      </Sidebar>

      <SidebarInset className="grid-bg">
        <div className="sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <Button asChild>
            <Link href="/">
              <ExternalLink size={16} />
              View Store
            </Link>
          </Button>
        </div>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
