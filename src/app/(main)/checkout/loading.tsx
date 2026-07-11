import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-x-4 ">
      <div className="order-1 md:order-2 md:col-span-6 col-span-12   bg-card sm:py-6 py-4 px-5 sm:px-10 rounded-md border drop-shadow-md h-fit flex flex-col md:gap-y-4 gap-4">
        <Skeleton className="w-24 h-5"></Skeleton>
        <div className="flex items-start gap-4">
          <Skeleton className="size-10"></Skeleton>
          <div className="flex flex-col items-start gap-2">
            <Skeleton className="w-26 h-3"></Skeleton>
            <Skeleton className="w-16 h-3"></Skeleton>
          </div>
        </div>

        <Separator />
        <div className="flex items-start justify-between">
          <Skeleton className="w-16 h-3"></Skeleton>
          <Skeleton className="w-16 h-3"></Skeleton>
        </div>
        <Skeleton className="max-w-45 w-full h-3"></Skeleton>
        <Separator />
        <div className="flex items-center justify-between">
          <Skeleton className="w-15 h-4"></Skeleton>
          <Skeleton className="w-15 h-4"></Skeleton>
        </div>
      </div>
      <div className="flex flex-col rounded-xl  mt-4 md:mt-0 bg-card border p-4  md:col-span-6 col-span-12  order-2 md:order-1  gap-4 w-full ">
        <Skeleton className="h-6 w-35"></Skeleton>
        <Skeleton className="h-5 w-30"></Skeleton>
        <div className="flex flex-col items-start gap-2">
          <Skeleton className="h-4 w-10"></Skeleton>
          <Skeleton className="h-9 w-full"></Skeleton>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Skeleton className="h-4 w-10"></Skeleton>
          <Skeleton className="h-9 w-full"></Skeleton>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Skeleton className="h-4 w-10"></Skeleton>
          <Skeleton className="h-9 w-full"></Skeleton>
        </div>
        <Skeleton className="h-11 mt-4 w-full"></Skeleton>
      </div>
    </div>
  );
}
