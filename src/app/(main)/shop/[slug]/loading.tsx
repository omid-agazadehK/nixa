import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-10 flex md:flex-row flex-col  justify-between  relative gap-5 bg-card rounded-2xl   ">
      <Skeleton className="w-200  lg:h-100 h-70 lg:col-span-5 " />
      <div className="w-full p-2    flex flex-col items-start gap-5">
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
