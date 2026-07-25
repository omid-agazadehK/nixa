import AccountOrders from "@/components/account/accountOrders";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Orders",
};
export default function AccountOrdersPage() {
  return <AccountOrders />;
}
