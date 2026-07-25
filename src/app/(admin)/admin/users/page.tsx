import AdminUsersView from "@/components/admin/adminUsersView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users",
};
export default function AdminUsersPage() {
  return <AdminUsersView />;
}
