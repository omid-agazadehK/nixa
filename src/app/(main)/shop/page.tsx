import ShopView from "@/components/shop/shopView";
import { ShopSearchParams } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  return <ShopView searchParams={await searchParams} />;
}
