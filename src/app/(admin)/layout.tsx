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
import { sidebarData } from "@/lib/constants";
import { isActive } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { createElement } from "react";

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
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className="text-muted-foreground"
                        size="lg"
                        asChild
                        isActive={isActive(pathname, item.url)}
                      >
                        <Link href={item.url}>
                          {createElement(item.icon)}
                          {item.title}
                        </Link>
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

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
