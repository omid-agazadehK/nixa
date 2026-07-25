import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="grid lg:grid-cols-2 grid-cols-1 lg:gap-16 gap-8 items-center  mt-10">
      <div className="flex flex-col items-start gap-5 order-2 lg:order-1 ">
        <p className="uppercase text-muted-foreground">New Collection 2025</p>
        <h2 className="lg:text-6xl md:text-5xl text-4xl font-bold font-fraunces ">
          Furniture made for modern living
        </h2>
        <p className="text-muted-foreground font-light leading-relaxed md:text-xl text-lg">
          Thoughtfully designed pieces that bring comfort and style to every
          corner of your home.
        </p>
        <Button asChild className="h-12 px-7" size="lg">
          <Link href="/shop">
            Shop Now <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="aspect-4/3 order-1 lg:order-2 relative lg:max-w-145 w-full lg:h-120 h-full rounded-2xl overflow-hidden">
        <Image
          src="/hero.webp"
          fill
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 50vw"
          alt="Hero Image"
          className="object-cover"
        />
      </div>
    </section>
  );
}
