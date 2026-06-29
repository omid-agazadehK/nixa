import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Logo({
  variant,
}: {
  variant?: "small" | "large" | "hero";
}) {
  return (
    <Link
      href={"/"}
      className="flex items-center font-fraunces justify-center gap-x-2"
    >
      <ShoppingBag
        size={variant === "hero" ? 40 : variant === "large" ? 28 : 24}
      />
      <h1
        className={
          variant === "hero"
            ? "text-3xl font-bold"
            : variant === "large"
              ? "text-xl font-bold"
              : "text-lg font-semibold"
        }
      >
        Nexi sho
      </h1>
    </Link>
  );
}
