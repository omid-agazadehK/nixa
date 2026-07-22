import MainHeader from "@/components/layout/main/mainHeader";
import MobileNav from "@/components/layout/main/mobileNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col pb-20 md:pb-0">
      <MainHeader />
      <main className="flex-1 flex flex-col item-center mx-auto w-full max-w-7xl px-5 sm:px-10 xl:px-0">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
