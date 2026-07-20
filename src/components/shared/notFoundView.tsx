import Link from "next/link";
import { Button } from "../ui/button";

export function NotFoundView() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-9xl animate-bounce text-primary font-extrabold">
        404
      </h1>
      <p className="text-4xl">Page not found</p>
      <p className="text-muted-foreground text-xl ">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
