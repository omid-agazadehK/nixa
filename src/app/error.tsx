"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="z-10 text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-linear-to-b from-primary to-primary/40 leading-none drop-shadow-2xl">
            500
          </h1>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          Oops... Something went wrong
        </h2>

        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
          Unfortunately, an error occurred while processing your request. You
          can try again or return to the homepage.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 text-left bg-primary border rounded-xl p-4 backdrop-blur-sm overflow-x-auto">
            <p className="text-sm font-mono text-red-300 break-all">
              <span className="text-primary-foreground">Error message: </span>
              {error?.message || "Unknown error"}
            </p>
            {error?.digest && (
              <p className="text-xs font-mono text-primary-foreground mt-2">
                Error Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex  gap-4 justify-center items-center">
          <Button  className="text-lg py-5" onClick={() => reset()}>
            Try Again
          </Button>
        </div>
      </div>
    </main>
  );
}
