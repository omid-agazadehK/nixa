import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      key={product.id}
      href={`/shop/${product.slug}`}
      className="xs:col-span-1 col-span-2 "
    >
      <Card className="drop-shadow-sm h-full shadow-muted-foreground  shadow relative cursor-pointer duration-300 transition-colors border border-border hover:bg-muted/50">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={400}
          className="relative aspect-video w-full object-cover "
        />
        <CardHeader>
          <Badge variant={"secondary"} className="absolute top-2 left-2">
            {product.category.name}
          </Badge>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex flex-col gap-1 ">
            <span className="font-medium">Price</span>
            <span className="font-light">${product.price.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
