import SuccessView from "@/components/checkout/successView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Order Success",
};
export type SuccessSearchParams = {
  searchParams: Promise<{
    orderId: string;
  }>;
};
export default async function SuccessPage({
  searchParams,
}: SuccessSearchParams) {
  const orderId = (await searchParams).orderId;
  return <SuccessView orderId={orderId} />;
}
