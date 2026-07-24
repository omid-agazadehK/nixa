import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";
type Props = {
  label: string;
  count: number;
  total: number;
  color?: string;
};
export default function AdminOrderStatusItem({
  label,
  count,
  total,
  color,
}: Props) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex flex-col gap-2  ">
      <div className="flex items-center gap-2 justify-between pl-4 relative">
        <div
          className={cn(
            "size-2 rounded-full absolute top-1/2 -translate-y-1/2 left-0 ",
            color,
          )}
        />

        <span className="font-light">{label}</span>
        <span className=" text-black">{count}</span>
      </div>
      <Progress value={percentage} indicatorClassName={color} />
    </div>
  );
}
