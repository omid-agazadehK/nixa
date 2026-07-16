"use client";

import { Handbag, LucideIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
const profileLinks: {
  href: string;
  title: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/profile",
    title: "Profile",
    icon: User,
  },
  {
    href: "/profile/order",
    title: "Order",
    icon: Handbag,
  },
];
export default function ProfileNavItem() {
  const pathName = usePathname();
  return (
    <>
      {profileLinks.map((item) => {
        const isActive =
          item.href === "/profile"
            ? pathName === "/profile"
            : pathName.startsWith(item.href);

        const Icon = item.icon;

        return (
          <Button
            key={item.href}
            variant={isActive ? "default" : "ghost"}
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
