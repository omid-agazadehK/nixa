import Logo from "@/components/shared/logo";
import { Suspense } from "react";
import HeaderActions from "./headerActions";
import HeaderActionsSkeleton from "./headerActionsSkeleton";
import NavLinks from "./navLinks";

export default async function MainHeader() {
  return (
    <header className="border-border bg-background/20 sticky top-0 z-50 hidden w-full border-b px-2 backdrop-blur-lg sm:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-x-10">
          <Logo variant="small" />
          <NavLinks />
        </div>
        <Suspense fallback={<HeaderActionsSkeleton />}>
          <HeaderActions />
        </Suspense>
      </div>
    </header>
  );
}
