import ShopView from "@/components/shopView";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { sort?: string; category?: string,q?:string };
}) {
  return <ShopView searchParams={await searchParams} />;
}
