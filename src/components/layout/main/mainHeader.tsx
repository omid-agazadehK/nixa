import Logo from "@/components/shared/logo";
import HeaderActions from "./headerActions";
import NavLinks from "./navLinks";

export default function MainHeader() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 hidden w-full border-b px-2 backdrop-blur-lg sm:block">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Logo variant="small" />
        <NavLinks />
        <HeaderActions />
      </nav>
    </header>
  );
}
