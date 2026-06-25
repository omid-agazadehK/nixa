"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
export default function Category() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleCategory(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
      router.push(`${pathname}?${params.toString()}`);
      return;
    }
    params.set("category", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-30">
        <Button variant="outline" className="flex items-center justify-between">
          {searchParams.get("category") ?? "all"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={searchParams.get("category") ?? "newest"}
            onValueChange={handleCategory}
          >
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="chairs">Chairs</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="sofas">Sofas</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="tables">Tables</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
