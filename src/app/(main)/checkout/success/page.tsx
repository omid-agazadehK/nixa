import SuccessView from "@/components/checkout/successView";
import { SuccessSearchParams } from "@/types";

export default async function SuccessPage({
  searchParams,
}: SuccessSearchParams) {
  return <SuccessView searchParams={await searchParams} />;
}
