import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <Card
          key={i}
          className="w-full lg:col-span-2 sm:col-span-3  col-span-4  border border-border"
        >
          <CardHeader>
            <Skeleton className="aspect-video w-full" />
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
