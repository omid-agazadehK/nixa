import EditProductPageView from "@/components/admin/editProductPage";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <EditProductPageView params={params} />;
}
