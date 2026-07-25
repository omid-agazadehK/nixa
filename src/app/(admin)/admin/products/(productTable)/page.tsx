import AdminProductsView from "@/components/admin/adminProductsView";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Products",
};
export default async function AdminProductsPage() {
  return <AdminProductsView />;
}
