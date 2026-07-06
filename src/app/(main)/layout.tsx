import Header from "@/components/layout/header";
import MobileNav from "@/components/layout/mobileNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl md:mt-20 px-5 sm:px-10 xl:px-0">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
