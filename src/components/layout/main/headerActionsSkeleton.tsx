import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderActionsSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-10" />
      <Skeleton className="size-10" />
      <Skeleton className="size-10" />
    </div>
  );
}
