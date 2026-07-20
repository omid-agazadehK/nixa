"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  console.log(error);
  return (
    <div className="flex min-h-dvh flex-col pb-20">
      <main className="flex-1 mx-auto w-full max-w-7xl md:mt-20 mt-10 px-5 sm:px-10 xl:px-0">
        <Button onClick={unstable_retry}>retry</Button>
      </main>
    </div>
  );
}
