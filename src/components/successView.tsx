import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/utils";
import { SuccessSearchParams } from "@/types";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default async function SuccessView({
  searchParams,
}: SuccessSearchParams) {
  const orderId = searchParams.orderId;
  const userId = await requireUserId();

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
  });
  if (!order) {
    notFound();
  }
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="flex items-center flex-col gap-3">
        <CircleCheck className="text-green-500" size={125} />
        <CardTitle>Order Confirmed! 🎉</CardTitle>
        <CardDescription>Thank you for your purchase!</CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <p>Order #{order.id}</p>
        <p>Total: ${order.totalPrice.toFixed(2)}</p>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full sm:text-base h-10" size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
