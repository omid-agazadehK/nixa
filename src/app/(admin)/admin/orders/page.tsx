import AdminOrdersView from "@/components/admin/adminOrdersView";
import { Metadata } from "next";
export const metadata:Metadata = {
  title: "Orders",
};
export default function AdminOrdersPage() {
  return <AdminOrdersView />;
}
