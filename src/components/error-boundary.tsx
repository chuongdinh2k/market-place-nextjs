"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({
  children,
  fallback = <DefaultErrorFallback />,
}: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught error:", error);
      setError(error.error);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    if (
      React.isValidElement(fallback) &&
      fallback.type === DefaultErrorFallback
    ) {
      return (
        <DefaultErrorFallback error={error} reset={() => setHasError(false)} />
      );
    }
    return fallback;
  }

  return <>{children}</>;
}

interface DefaultErrorFallbackProps {
  error?: Error | null;
  reset?: () => void;
}

function DefaultErrorFallback({ error, reset }: DefaultErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-red-50 border border-red-100 rounded-lg">
      <h2 className="text-xl font-semibold text-red-700 mb-2">
        Something went wrong
      </h2>
      {error && (
        <p className="text-red-600 mb-4 text-center max-w-md">
          {error.message || "An unexpected error occurred"}
        </p>
      )}
      {reset && (
        <Button
          onClick={reset}
          variant="outline"
          className="border-red-300 hover:bg-red-100 text-red-700"
        >
          Try again
        </Button>
      )}
    </div>
  );
}
