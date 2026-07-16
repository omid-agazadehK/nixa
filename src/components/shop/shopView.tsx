import { ShopSearchParams } from "@/types";
import { Suspense } from "react";
import ProductCardSkeleton from "./productCardSkeleton";
import Category from "./category";
import Products from "./products";
import SearchInput from "./searchInput";
import SortBy from "./sortBy";

export default function ShopView({
  searchParams,
}: {
  searchParams: ShopSearchParams;
}) {
  return (
    <div className="mt-5 flex flex-col space-y-5 gap-x-12   md:flex-row ">
      <SortBy />
      <div className="grid w-full grid-cols-2 gap-x-10 gap-y-5">
        <div className="xs:flex-row xs:items-center col-span-2 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Shop</h3>
            <span className="text-sm font-light">
              Browse our full collection
            </span>
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
