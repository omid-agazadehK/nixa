import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="lg:col-span-9 md:col-span-8 col-span-12 bg-card rounded-xl shadow h-fit md:p-8 p-2">
      <div className="w-full border rounded-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12 ml-auto" />
        </div>

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 items-center px-4 py-4 border-b"
          >
            <Skeleton className="h-4 w-20" />

            <Skeleton className="h-6 w-20 rounded-full" />

            <Skeleton className="h-4 w-24" />

            <Skeleton className="h-4 w-16" />

            <Skeleton className="h-8 w-8 rounded-md ml-auto" />
          </div>
        ))}

        <div className="grid grid-cols-5 gap-4 px-4 py-4">
          <Skeleton className="h-4 w-16 col-span-4" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
      </div>
    </section>
  );
}
