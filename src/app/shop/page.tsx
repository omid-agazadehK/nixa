import ShopView from "@/components/shopView";
import { ShopSearchParams } from "@/types";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: ShopSearchParams;
}) {
  return <ShopView searchParams={await searchParams} />;
}
