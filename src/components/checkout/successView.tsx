import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function SuccessView({ orderId }: { orderId: string }) {
  const user = await requireUser();

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId: user.id },
  });
  if (!order) {
    notFound();
  }
  return (
    <section className="flex-1 h-full flex items-center justify-center text-center">
      <Card className="md:min-w-lg max-md:w-full  ">
        <CardHeader className="flex items-center flex-col gap-3">
          <CircleCheck className="text-green-500" size={125} />
          <CardTitle className="text-2xl">Order Confirmed! 🎉</CardTitle>
          <CardDescription className="text-lg">
            Thank you for your purchase!
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <p>Order #{order.id}</p>
          <p>Total: ${order.totalPrice.toFixed(2)}</p>
        </CardContent>

        <CardFooter>
          <Button asChild className="w-full sm:text-base h-10" size="lg">
            <Link href="/shop" replace>
              Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
