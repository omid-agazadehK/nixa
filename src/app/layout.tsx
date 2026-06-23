import Header from "@/components/layout/header";
import { Inter } from "next/font/google";
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
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="h-500 flex flex-col ">
        <Header />
        {children}

        <span className="text-2xl font-bold ">
          hello my name is omid agazadeh and i work for master company
        </span>
      </body>
    </html>
  );
}
