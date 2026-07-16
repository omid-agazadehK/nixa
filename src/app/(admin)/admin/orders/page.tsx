import AdminOrdersView from "@/components/admin/adminOrdersView";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page: pageParam } = await searchParams;

  return <AdminOrdersView pageParam={pageParam} />;
}
