import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="flex items-start flex-col gap-2">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid grid-cols-12 gap-2 mt-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-50 w-full max-w-96 bg-card p-6 border rounded-2xl flex flex-col justify-between gap-4 lg:col-span-3 md:col-span-4 col-span-12"
          >
            <div className="flex items-start justify-between w-full">
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
