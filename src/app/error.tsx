"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="w-full max-w-md p-8 bg-red-50 border border-red-100 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-red-700 mb-4">
              Something went wrong!
            </h2>
            <p className="text-red-600 mb-6">
              {error.message || "An unexpected error occurred"}
            </p>
            <div className="flex justify-center">
              <Button
                onClick={reset}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
