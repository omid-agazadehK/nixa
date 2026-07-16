"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
export default function SortBy() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="p-5 mt-8 bg-secondary shadow-sm md:w-fit rounded-xl h-fit flex flex-col items-start gap-y-10">
      <span className="flex items-center gap-x-2 justify-start font-semibold">
        <ArrowUpDown size={16} className="text-muted-foreground" />
        Sort By
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="lg:w-46 md:w-36 w-full font-medium"
        >
          <Button
            variant="outline"
            className="flex items-center justify-between"
          >
            {searchParams.get("sort") ?? "newest"}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56">
          <DropdownMenuGroup>
            <DropdownMenuRadioGroup
              value={searchParams.get("sort") ?? "newest"}
              onValueChange={handleSort}
            >
              <DropdownMenuRadioItem value="newest">
                newest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-asc">
                Price: Low to high
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-desc">
                Price: High to low
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
