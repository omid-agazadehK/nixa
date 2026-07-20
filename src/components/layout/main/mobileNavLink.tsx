"use client";
import { cn, isActive } from "@/lib/utils";
import type { MobileNavRoutes } from "@/types";
import { House, ShoppingBag, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const icons = {
  House,
  ShoppingBag,
  ShoppingBasket,
} as const;

export default function MobileNavLink({ item }: { item: MobileNavRoutes }) {
  const pathname = usePathname();

  const active = isActive(pathname, item.href);
  const Icon = icons[item.icon];
  return (
    <Link
      href={item.href ?? "#"}
      className={cn(
        "flex w-full flex-col  items-center p-1 justify-center gap-y-1 rounded-lg ",
        active &&
          " bg-primary/90 text-primary-foreground transition-colors duration-300 ",
      )}
    >
      <Icon size={20} strokeWidth={1.5} />
      {item.title}
    </Link>
  );
}
