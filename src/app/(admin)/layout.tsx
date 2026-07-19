"use client";
import Logo from "@/components/shared/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { isActive } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const sidebarData = {
  navMain: [
    {
      title: "Menu",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
        },
        {
          title: "Products",
          url: "/admin/products",
        },
        {
          title: "Orders",
          url: "/admin/orders",
        },
      ],
    },
  ],
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader className="h-16 border-b items-start justify-center">
          <div className="flex items-center justify-between">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          {sidebarData.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu >
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(pathname, item.url)}
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>

      <SidebarInset className="grid-bg">
        <div className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1 min-w-0  flex-col gap-4 p-4 ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
