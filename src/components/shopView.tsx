import { Suspense } from "react";
import Products from "./products";

export default function ShopView({
  searchParams,
}: {
  searchParams: { sort?: string; category?: string; q?: string };
}) {
  return (
    <div className="max-w-7xl mx-auto  w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Products searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
