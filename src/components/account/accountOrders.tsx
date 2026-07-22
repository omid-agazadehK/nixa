import { auth } from "@/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ORDER_STATUS } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import AccountOrderSheet from "./accountOrderSheet";

export default async function AccountOrders() {
  const session = await auth();
  const user = session?.user;
  const userOrders = await prisma.order.findMany({
    where: { userId: user?.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  console.log(userOrders);
  return (
    <div className="lg:col-span-9 md:col-span-8 col-span-12 bg-card rounded-xl border shadow h-fit md:p-8 p-2 ">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          className="md:h-100 md:min-h-100 h-70 min-h-70 "
        >
          {userOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {order.id.slice(0, 8)}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={` text-xs ${ORDER_STATUS[order.status].style}`}
                >
                  {ORDER_STATUS[order.status].label}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{order.totalPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <AccountOrderSheet user={user} order={order} />
              </TableCell>
            </TableRow>
          ))}
          {userOrders.length === 0 && (
            <TableRow>
              <TableCell className="text-center" colSpan={5}>
                <h2 className="text-lg font-semibold">No orders yet</h2>
                <p className="text-muted-foreground">
                  You haven&lsquo;t placed any orders yet.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {userOrders
                .reduce((sum, item) => sum + item.totalPrice, 0)
                .toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
