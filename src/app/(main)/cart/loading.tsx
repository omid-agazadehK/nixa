import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-x-4 mt-10 ">
      <div className="xl:col-span-4 order-1 md:order-2 md:col-span-5 col-span-12  bg-card sm:py-6 py-4 px-5 sm:px-10 rounded-md border drop-shadow-md h-fit flex flex-col md:gap-y-4 gap-4">
        <Skeleton className="w-24 h-5"></Skeleton>
        <div className="flex items-start justify-between">
          <Skeleton className="w-16 h-3"></Skeleton>
          <Skeleton className="w-16 h-3"></Skeleton>
        </div>
        <div className="flex items-start justify-between">
          <Skeleton className="w-16 h-3"></Skeleton>
          <Skeleton className="w-16 h-3"></Skeleton>
        </div>
        <div className="flex items-start justify-between">
          <Skeleton className="w-16 h-3"></Skeleton>
          <Skeleton className="w-16 h-3"></Skeleton>
        </div>
        <Separator />
        <div className="flex items-start justify-between">
          <Skeleton className="w-16 h-3"></Skeleton>
          <Skeleton className="w-16 h-3"></Skeleton>
        </div>
        <Skeleton className="max-w-45 w-full h-3"></Skeleton>
        <Skeleton className=" w-full h-10"></Skeleton>
      </div>
      <div className="flex flex-col  mt-4 md:mt-0  order-2 md:order-1 xl:col-span-8 md:col-span-7 col-span-12 gap-4 w-full ">
        <Skeleton className="w-24 h-4"></Skeleton>
        <Skeleton className="w-48 h-3"></Skeleton>

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 bg-card p-4 border rounded-md w-full "
          >
            <div className="flex items-center gap-5">
              <Skeleton className="size-20"></Skeleton>
              <div className="flex flex-col gap-5">
                <Skeleton className="w-20 h-3"></Skeleton>
                <Skeleton className="w-10 h-3"></Skeleton>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <Skeleton className="w-12 h-3"></Skeleton>
              <Skeleton className="w-25 h-4"></Skeleton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
