"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import { isActive } from "@/lib/utils";

type NavItems = { title: string; href: string }[];
const navItems: NavItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
];

export default function NavLinks() {
  const pathName = usePathname();

  return (
    <nav>
      {navItems.map((nav) => (
        <Button
          key={nav.href}
          asChild
          variant={isActive(pathName,nav.href) ? "secondary" : "ghost"}
        >
          <Link className="relative" href={nav.href}>
            {nav.title}
            {isActive(pathName,nav.href) && (
              <span className="absolute bottom-0 left-1/2  h-0.5 w-6 bg-primary -translate-x-1/2"></span>
            )}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
