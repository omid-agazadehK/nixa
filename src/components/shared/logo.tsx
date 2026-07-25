import { Armchair } from "lucide-react";
import Link from "next/link";

export default function Logo({
  variant = "small",
}: {
  variant?: "small" | "large" | "hero";
}) {
  const dimensions = {
    small: {
      box: "p-1.5 rounded-lg",
      icon: 22,
      text: "text-xl",
      sub: "hidden",
    },
    large: { box: "p-2 rounded-xl", icon: 28, text: "text-2xl", sub: "hidden" },
    hero: {
      box: "p-3 rounded-2xl",
      icon: 40,
      text: "text-4xl md:text-5xl",
      sub: "block",
    },
  };

  const current = dimensions[variant];

  return (
    <Link
      href="/"
      className="group/logo flex items-center gap-x-2.5 font-fraunces w-fit"
    >
      <div
        className={`flex items-center justify-center bg-primary/10 text-primary border border-primary/15 transition-all duration-300 group-hover/logo:bg-primary group-hover/logo:text-primary-foreground group-hover/logo:shadow-lg group-hover/logo:shadow-primary/20 ${current.box}`}
      >
        <Armchair size={current.icon} />
      </div>

      <div className="flex flex-col justify-center">
        <h1
          className={`font-bold tracking-tight text-foreground ${current.text} transition-colors group-hover/logo:text-primary`}
        >
          Nixa<span className="text-accent">.</span>
        </h1>

        {variant === "hero" && (
          <span className="text-[0.7rem] font-fraunces font-normal text-muted-foreground tracking-[0.3em] uppercase mt-1">
            Furniture Studio
          </span>
        )}
      </div>
    </Link>
  );
}
