import Providers from "@/components/provider";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className={`${inter.className} min-h-screen `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
