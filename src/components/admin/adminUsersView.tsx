import { prisma } from "@/lib/prisma";
import { DataTable } from "../ui/data-table";
import { usersColumns } from "./usersColumns";

export default async function AdminUsersView() {
  const User = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  return (
    <div className="p-6 max-w-6xl w-full mx-auto space-y-6">
      <section className="p-6 max-w-6xl w-full mx-auto space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">User</h2>
          <p className="text-sm text-muted-foreground">
            Manage your store User, update inventory, and keep your catalog
            organized.
          </p>
        </div>
        <DataTable columns={usersColumns} data={User} filterColumn="fullName" />
      </section>
    </div>
  );
}
