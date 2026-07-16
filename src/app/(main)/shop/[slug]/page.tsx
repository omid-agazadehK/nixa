import ProductDetailsView from "@/components/shop/productDetailsView";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  return <ProductDetailsView params={await params} />;
}
