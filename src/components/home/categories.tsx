import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
const categories = [
  {
    name: "Chairs",
    href: "/shop?category=chairs",
    image: "/chair.webp",
  },
  {
    name: "Sofas",
    href: "/shop?category=sofas",
    image: "/sofa.webp",
  },
  {
    name: "Tables",
    href: "/shop?category=tables",
    image: "/table.webp",
  },
];
export default function Categories() {
  return (
    <section className="mt-20">
      <h2 className="text-3xl font-semibold">Shop by Category</h2>
      <div className="flex items-center mt-1 justify-between text-muted-foreground">
        <p className=" font-light">
          Find exactly what you&lsquo;re looking for
        </p>

        <Button variant="link" asChild>
          <Link href="/shop">
            ViewShop <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-7 mt-10  ">
        {categories.map((item, index) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group relative overflow-hidden aspect-3/2 rounded-2xl",
              index === categories.length - 1 && "sm:col-span-2 lg:col-span-1",
            )}
          >
            <Image
              src={item.image}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="eager"
              fill
              alt="Category"
            />
            <div className="absolute text-primary-foreground bottom-0 left-0 p-6 space-y-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <span className=" text-sm text-primary-foreground/70">
                18 Produtct
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
