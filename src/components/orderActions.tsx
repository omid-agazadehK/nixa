"use client";
import { changeOrderStatus } from "@/actions/order.actios";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function OrderActions({ id }: { id: string }) {
  const router = useRouter();
  const statusHadnler = async (e: MouseEvent<HTMLElement>) => {
    const innerText = e.currentTarget.innerText;
    const res = await changeOrderStatus(id, innerText);
    console.log(res);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {" "}
        <DropdownMenuLabel>action</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`orders/${id}`)}>
          Review
        </DropdownMenuItem>
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuItem onClick={(e) => statusHadnler(e)}>
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => statusHadnler(e)}>
          Delivered
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => statusHadnler(e)}>
          Cancelled
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
