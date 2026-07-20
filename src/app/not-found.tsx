import MainHeader from "@/components/layout/main/mainHeader";
import MobileNav from "@/components/layout/main/mobileNav";
import { NotFoundView } from "@/components/shared/notFoundView";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col pb-20 md:pb-0">
      <MainHeader />
      <main className="flex-1 mx-auto w-full max-w-7xl flex items-center justify-center">
        <NotFoundView />
      </main>
      <MobileNav />
    </div>
  );
}
