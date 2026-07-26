import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="lg:col-span-2 sm:col-span-3 col-span-6">
          <Card>
            <CardHeader>
              <Skeleton className="aspect-video w-full" />
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}
