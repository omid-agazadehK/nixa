import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";
import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-x-2">
      <Button variant="outline" asChild size={"lg"}>
        <Link href={"/login"}>
          <LogIn />
          Login
        </Link>
      </Button>
      <Button asChild size={"lg"}>
        <Link href={"/signup"}>
          <User />
          SignUp
        </Link>
      </Button>
    </div>
  );
}
