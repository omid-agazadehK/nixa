import NotFoundButton from "@/components/notFoundButton";
import { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});
export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fraunces.variable}>
      <body
        className={`${inter.className} min-h-dvh flex items-center justify-center font-medium`}
      >
        <main className="z-10 text-center max-w-2xl mx-auto ">
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-linear-to-b from-primary to-primary/40 leading-none drop-shadow-2xl">
              404
            </h1>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            The page you are looking for doesn&rsquo;t exist or has been moved.
          </h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
            You can return to the homepage.
          </p>

          <NotFoundButton />
        </main>
      </body>
    </html>
  );
}
