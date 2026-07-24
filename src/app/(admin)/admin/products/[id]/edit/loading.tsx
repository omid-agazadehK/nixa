import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 max-w-6xl w-full mx-auto space-y-6">
      <section className="flex items-center justify-center mt-10">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <Skeleton className="h-9 w-56" />
            <CardDescription>
              <Skeleton className="h-4 w-80 mt-2" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 flex flex-col gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="col-span-12 flex md:flex-row flex-col gap-5">
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="md:col-span-6 col-span-12 flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="col-span-12 flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="col-span-12 flex flex-col gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-32 w-full" />
              </div>

              <div className="col-span-12 flex flex-col gap-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
