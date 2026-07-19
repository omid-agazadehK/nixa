import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function OrderSummarySkeleton() {
  return (
    <div className="order-1 md:order-2 md:col-span-6 col-span-12   bg-card sm:py-6 py-4 px-3 sm:px-10 rounded-md border drop-shadow-md h-fit flex flex-col md:gap-y-4 gap-4">
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
  );
}
