import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="lg:col-span-9 md:col-span-8 col-span-12 bg-card rounded-xl shadow h-fit md:px-7.5 md:py-10 p-6">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-12 w-40" />
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-11 w-full md:col-span-1 col-span-2" />

          <Skeleton className="h-11 w-full md:col-span-1 col-span-2" />

          <Skeleton className="h-11 w-full md:col-span-1 col-span-2" />

          <Skeleton className="h-11 w-full md:col-span-1 col-span-2" />

          <Skeleton className="h-11 w-full md:col-span-1 col-span-2" />
        </div>
      </div>
    </div>
  );
}
