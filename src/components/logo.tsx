import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Logo({ variant }: { variant?: "small" | "large" }) {
  return (
    <Link href={"/"} className="flex items-center justify-center gap-x-2">
      <ShoppingBag size={variant === "large" ? 28 : 24} />
      <h1
        className={
          variant === "large" ? "text-xl font-bold" : "text-lg font-semibold"
        }
      >
        Nexi sho
      </h1>
    </Link>
  );
}
