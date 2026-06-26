import Header from "@/components/layout/header";
import MobileNav from "@/components/layout/mobileNav";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full `}>
      <body className="flex h-500 flex-col">
        <Header />
        {children}
        <MobileNav />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
