import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-12 bg-card  w-full gap-5">
      <Skeleton className="lg:size-100 w-full h-100 lg:col-span-5 col-span-12" />
      <div className="w-full p-2  lg:col-span-7 col-span-12 flex flex-col items-start gap-5">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-100" />
          <Skeleton className="h-5 w-15" />
        </div>
        <Separator />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-30" />
          <Skeleton className="h-6 w-100" />
        </div>
        <Separator />
        <div className="flex flex-col gap-3 ">
          <Skeleton className="h-6 w-15" />
          <Skeleton className="h-9 w-30" />
          <Skeleton className="lg:h-20 h-15 md:w-100 w-70" />
        </div>
      </div>
    </div>
  );
}
