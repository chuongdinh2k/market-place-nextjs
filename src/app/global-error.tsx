/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error }: any) {
  return (
    <html lang="en">
      <body className="p-4">
        <ErrorDisplay error={{ error: error?.message }} />

        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      </body>
    </html>
  );
}
