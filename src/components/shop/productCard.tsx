import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductWithCategory } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ProductCard({
  product,
}: {
  product: ProductWithCategory;
}) {
  return (
    <Card className="group bg-transparent  ring-0">
      <div className="relative aspect-4/4 h-75 w-full rounded-2xl overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover  group-hover:scale-103 transition-transform duration-500 "
        />
        <Badge variant={"secondary"} className="absolute top-2 left-2">
          {product.category.name}
        </Badge>
      </div>
      <CardHeader className="px-0">
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>${product.price.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto px-0">
        <Button asChild className="w-full h-10 text-base">
          <Link href={`/shop/${product.slug}`}>View Product</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
