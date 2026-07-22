import { ShopSearchParams } from "@/types";
import { Suspense } from "react";

import Category from "./category";
import ProductCardSkeleton from "./productCardSkeleton";
import Products from "./products";
import SearchInput from "./searchInput";
import SortBy from "./sortBy";

export default async function ShopView({
  searchParams,
}: {
  searchParams: ShopSearchParams;
}) {
  return (
    <div className="mt-5 flex flex-col pb-10 space-y-5 gap-x-12   md:flex-row ">
      <SortBy />
      <div className="grid w-full grid-cols-6 gap-x-10 gap-y-5">
        <div className="xs:flex-row xs:items-center col-span-6 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Shop</h3>
            <p className="text-sm font-light">Browse our full collection</p>
          </div>
          <SearchInput />
        </div>
        <Category />
        <Suspense fallback={<ProductCardSkeleton />}>
          <Products searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
