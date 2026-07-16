import AdminProductsView from "@/components/admin/adminProductsView";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page: pageParam } = await searchParams;

  return <AdminProductsView pageParam={pageParam} />;
}
