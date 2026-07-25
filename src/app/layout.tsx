import Providers from "@/components/provider";
import { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});
export const metadata: Metadata = {
  title: {
    default: "Nixa | Modern Furniture Store",
    template: "%s | Nixa",
  },
  description:
    "Nixa is a modern furniture e-commerce platform for discovering and purchasing quality furniture for your home.",
  openGraph: {
    title: "Nixa | Modern Furniture Store",
    description: "A modern furniture e-commerce platform built with Next.js.",
    url: "https://your-domain.com",
    siteName: "Nixa",
    images: [
      {
        url: "/openGraph.png",
        width: 1200,
        height: 630,
        alt: "my store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className={`${inter.className} min-h-dvh  font-medium`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
