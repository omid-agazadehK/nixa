"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function NotFoundButton() {
  const router = useRouter();
  const handleGoHome = () => {
    router.push("/");
    router.refresh();
  };
  return (
    <div className="flex  gap-4 justify-center items-center">
      <Button onClick={handleGoHome} className="text-lg py-5">
        Return Home
      </Button>
    </div>
  );
}
