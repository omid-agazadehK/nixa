"use client";

import { isActive } from "@/lib/utils";
import { Handbag, LucideIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
const accountLinks: {
  href: string;
  title: string;
  icon: LucideIcon;
  exact?: boolean;
}[] = [
  {
    href: "/account",
    title: "Account",
    icon: User,
    exact: true,
  },
  {
    href: "/account/orders",
    title: "Order",
    icon: Handbag,
  },
];
export default function AccountNavItem() {
  const pathName = usePathname();
  return (
    <>
      {accountLinks.map((item) => {
        const Icon = item.icon;

        return (
          <Button
            key={item.href}
            variant={
              isActive(pathName, item.href, item.exact) ? "default" : "ghost"
            }
            asChild
            className="px-4 text-base font-medium justify-start gap-2"
          >
            <Link href={item.href}>
              <Icon className="size-4" />
              {item.title}
            </Link>
          </Button>
        );
      })}
    </>
  );
}
