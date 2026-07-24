import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="p-6 max-w-6xl w-full mx-auto space-y-6">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-72 " />
      </div>

      <div className="rounded-md border bg-card ">
        <div className="p-4 border-b flex items-center justify-between">
          <Skeleton className="h-9 w-32 bg-muted " />
          <Skeleton className="h-9 w-64 bg-muted " />
        </div>

        <div className="divide-y ">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 p-4">
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        <div className="flex items-center border-t justify-center p-4">
          <Skeleton className="w-40 h-5" />
        </div>
      </div>
    </div>
  );
}
