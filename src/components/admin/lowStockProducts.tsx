import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { prisma } from "@/lib/prisma";

export default async function LowStockProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      stock: "asc",
    },
    take: 5,
  });
  return (
    <section>
      <div className="bg-card rounded-lg border border-border ">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold">Low Stock Products</h2>
          <Badge className="text-xs bg-yellow-500/20 text-yellow-800 ring">
            Needs attention
          </Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-black">{item.name}</TableCell>
                <TableCell className="text-black">{item.stock}</TableCell>
                <TableCell>
                  <Button asChild variant="link">
                    <Link href={`/admin/products/${item.id}/edit`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
