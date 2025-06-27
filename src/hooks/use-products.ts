import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

// Define Product interface
export interface Product {
  id: string;
  name: string;
  description: string | null | undefined;
  price: number;
  image?: string;
  originalPrice?: number;
  discountPercentage?: number;
  rating?: number;
  reviewCount?: number;
  // Add other fields as per your schema
}

export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    "/api/products",
    fetcher
  );

  return {
    products: data,
    isLoading,
    hasError: !!error,
    error,
    mutate, // For revalidation
  };
}

// Hook for fetching a single product
export function useProduct(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Product>(
    id ? `/api/products/${id}` : null,
    fetcher
  );

  return {
    product: data,
    isLoading,
    hasError: !!error,
    error,
    mutate,
  };
}
