"use client";

import { useProducts } from "@/hooks/use-products";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "./ui/error-message";
import { ErrorBoundary } from "./error-boundary";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";

export default function ProductList() {
  return (
    <ErrorBoundary>
      <ProductListContent />
    </ErrorBoundary>
  );
}

function ProductListContent() {
  const { products, isLoading, hasError, error, mutate } = useProducts();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();

  const onQuickView = (id: string) => {
    router.push(`/shop/${id}`);
  };

  const onAddToWishlist = (id: string) => {
    addToWishlist(id);
    mutate();
  };

  const onAddToCart = (id: string) => {
    addToCart(id);
    mutate();
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
      </div>
    );
  }

  // Handle error state
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ErrorMessage
          message={error?.message || "Failed to load products"}
          className="mb-4"
        />
        <Button onClick={() => mutate()}>Try Again</Button>
      </div>
    );
  }

  // Handle empty state
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="mb-2 text-xl font-semibold">No products found</h3>
        <p className="text-muted-foreground">
          Check back later for new products
        </p>
      </div>
    );
  }

  // Render products
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          onAddToWishlist={onAddToWishlist}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
