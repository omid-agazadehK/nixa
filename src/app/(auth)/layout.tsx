import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <section className="grid lg:grid-cols-2 grid-cols-1 h-screen justify-center ">
        <div className="relative lg:block hidden">
          <Image
            src="/AuthBg.avif"
            fill
            sizes="(max-width: 1023px) 0px, 50vw"
            alt="SignUp Image"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 img-overlay"></div>
          <div className="absolute text-primary-foreground bottom-15 left-14 max-w-md">
            <h2 className="font-medium leading-tight text-4xl font-fraunces">
              Furniture that feels like home.
            </h2>
            <p className="text-sm mt-3">
              Handcrafted sofas, tables & chairs designed to make every room
              warmer.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:gap-y-20 gap-y-10 relative items-center justify-center px-5 md:px-0">
          <Button variant="secondary" asChild className="absolute top-6 left-6">
            <Link href="/" className="flex items-center gap-1 text-sm ">
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </Button>
          <Logo variant="hero" />
          {children}
        </div>
      </section>
    </main>
  );
}
