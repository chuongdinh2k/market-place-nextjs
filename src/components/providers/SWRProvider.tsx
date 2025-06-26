"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/lib/utils/fetcher";

interface SWRProviderProps {
  children: React.ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 5000, // 5 seconds
        onError: (error, key) => {
          // Log errors to console or monitoring service
          console.error(`SWR Error for ${key}:`, error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
