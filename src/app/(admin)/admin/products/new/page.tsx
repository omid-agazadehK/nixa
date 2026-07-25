import NewView from "@/components/admin/newView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "New Product",
};
export default function NewPage() {
  return <NewView />;
}
