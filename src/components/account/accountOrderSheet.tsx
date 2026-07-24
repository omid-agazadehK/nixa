import { ORDER_STATUS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Eye, Package } from "lucide-react";
import { User } from "next-auth";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
export type UserOrders = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export default function AccountOrderSheet({
  order,
  user,
}: {
  user: User | undefined;
  order: UserOrders;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Order Details</SheetTitle>
        </SheetHeader>

        <Separator />
        <div className="grid flex-1 auto-rows-min gap-6 px-4 ">
          <div className="flex items-center justify-between">
            <span className="font-medium"> ORD-{order.orderNumber}</span>
            <Badge
              variant={"outline"}
              className={` text-xs ${ORDER_STATUS[order.status].style}`}
            >
              {ORDER_STATUS[order.status].label}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex font-medium flex-col text-xs gap-2 bg-muted p-2 border rounded">
              <span className="upercase font-semibold  text-muted-foreground truncate">
                CUSTOMER
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-sm truncate">{user?.fullName}</span>
                <span className="text-muted-foreground truncate">
                  {user?.email}
                </span>
              </div>
            </div>
            <div className="flex font-medium flex-col text-xs gap-2 bg-muted p-2 border rounded w-full  h-full ">
              <span className="upercase font-semibold  text-muted-foreground truncate">
                DATE
              </span>
              <span className="text-sm  truncate">
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>
          <h5>ITEMS</h5>
          <div className="flex flex-col items-center justify-center w-full gap-4 max-h-200 overflow-y-auto">
            {order.items?.map((item, index) => (
              <div
                key={index}
                className="bg-muted border rounded  flex items-center justify-between px-4 py-3 w-full"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-background rounded-lg text-muted-foreground p-2">
                    <Package className="size-5" />
                  </div>
                  <span className="max-w-50 truncate text-xs">
                    {item.product.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-xs">
                  <span>${item.product.price.toFixed(2)}</span>
                  <span>*{item.quantity}</span>
                </div>
              </div>
            ))}
            <div className="bg-muted border rounded text-sm flex items-center justify-between px-4 py-3 w-full">
              <span>Total</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
