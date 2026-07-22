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
        <svg
          width={current.icon}
          height={current.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 11V6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V11" />
          <path d="M5 11C3.89543 11 3 11.8954 3 13V18C3 18.5523 3.44772 19 4 19H5C5.55228 19 6 18.5523 6 18V17H18V18C18 18.5523 18.4477 19 19 19H20C20.5523 19 21 18.5523 21 18V13C21 11.8954 20.1046 11 19 11" />
          <path d="M6 19V21" />
          <path d="M18 19V21" />
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        <h1
          className={`font-bold tracking-tight text-foreground ${current.text} transition-colors group-hover/logo:text-primary`}
        >
          Nexi<span className="text-accent">.</span>
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
