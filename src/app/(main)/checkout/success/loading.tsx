import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex-1 h-full flex items-center justify-center">
      <Card className="md:min-w-lg max-md:w-full">
        <CardHeader className="flex items-center flex-col gap-3">
          <Skeleton className="w-31.25 h-31.25 rounded-full" />

          <Skeleton className="w-48 h-6" />

          <Skeleton className="w-32 h-4" />
        </CardHeader>

        <CardContent className="text-center flex flex-col items-center gap-2">
          <Skeleton className="w-24 h-4" />

          <Skeleton className="w-28 h-4" />
        </CardContent>

        <CardFooter>
          <Skeleton className="w-full h-10" />
        </CardFooter>
      </Card>
    </div>
  );
}
