import EditProductPageView from "@/components/editProductPage";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <EditProductPageView params={params} />;
}
