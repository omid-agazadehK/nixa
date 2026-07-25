import ProductDetailsView from "@/components/shop/productDetailsView";
import { getProductBySlug } from "@/lib/products";
import { Metadata } from "next";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}
export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;

  return <ProductDetailsView slug={slug} />;
}
