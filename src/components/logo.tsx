import { ShoppingBag } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-x-2">
      <ShoppingBag size={24} />
      <h1 className="text-lg font-semibold">Nexi</h1>
    </div>
  );
}
