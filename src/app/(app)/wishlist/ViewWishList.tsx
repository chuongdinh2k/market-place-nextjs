"use client";
import { ErrorBoundary } from "@/components/error-boundary";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Label } from "@/components/ui/label";
import { useWishlist } from "@/hooks/use-wishlist";
import { useRouter } from "next/navigation";

export default function ViewWishList() {
  return (
    <ErrorBoundary>
      <ViewListContent />
    </ErrorBoundary>
  );
}
function ViewListContent() {
  const router = useRouter();
  const {
    wishlistItems,
    isLoading,
    error,
    hasError,
    mutate,
    removeFromWishlist,
  } = useWishlist();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!wishlistItems) return <div>No wishlist found</div>;

  const onQuickView = (id: string) => {
    router.push(`/shop/${id}`);
  };

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    mutate();
  };

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

  return (
    <div>
      <div className="flex justify-between items-center mt-2 mb-2">
        <Label className="text-xl font-bold text-black">
          Wishlist ({wishlistItems.length})
        </Label>
        <Button
          variant="default"
          className="text-sm border-1 text-black border-black"
        >
          Move All to Cart
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <ProductCard
            key={item.id}
            product={item.product}
            onQuickView={onQuickView}
            onRemove={handleRemoveFromWishlist}
          />
        ))}
      </div>
    </div>
  );
}
