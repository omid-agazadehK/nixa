import EditProductPageView from "@/components/admin/editProductPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Edit Product",
};
export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <EditProductPageView params={params} />;
}
