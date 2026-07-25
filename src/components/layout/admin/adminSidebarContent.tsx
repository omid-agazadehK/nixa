"use client"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/lib/constants";
import { isActive } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createElement } from "react";

export default function AdminSidebarContent() {
  const pathname = usePathname();
  return (
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
  );
}
