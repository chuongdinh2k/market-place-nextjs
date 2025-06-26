"use client";

import { useState } from "react";
import DisplayProductImages from "./DisplayProductImages";
import ViewProductInfo from "./ViewProductInfo";
import { ErrorBoundary } from "@/components/error-boundary";
import { ErrorMessage } from "@/components/ui/error-message";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    rating: number;
    reviewCount: number;
    stock: number;
    image: string;
    images: string[];
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <ErrorBoundary>
      <ProductDetailContent product={product} />
    </ErrorBoundary>
  );
}

function ProductDetailContent({ product }: ProductDetailProps) {
  const [error, setError] = useState<Error | null>(null);

  // If there's an error in the component
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <ErrorMessage
            message={error.message || "Failed to display product details"}
            className="mb-4"
          />
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Images */}
          <DisplayProductImages
            mainImage={
              product.image ||
              (product.images[0] ?? "/images/products/keyboard.jpg")
            }
            images={product.images}
            productName={product.name}
          />

          {/* Product Info */}
          <ViewProductInfo product={product} />
        </div>
      </div>
    );
  } catch (err) {
    setError(
      err instanceof Error ? err : new Error("An unexpected error occurred")
    );
    return null;
  }
}
