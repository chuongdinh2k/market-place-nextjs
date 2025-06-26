"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";
import { Product } from "./use-products";

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

export function useWishlist() {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [isRemovingFromWishlist, setIsRemovingFromWishlist] = useState(false);

  const {
    data: wishlistItems,
    error,
    isLoading,
    mutate,
  } = useSWR<WishlistItem[]>("/api/wishlist", fetcher);

  // Add item to wishlist
  const addToWishlist = async (productId: string) => {
    try {
      setIsAddingToWishlist(true);
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to wishlist");
      }

      // Revalidate wishlist data
      await mutate();
      return true;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return false;
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (itemId: string) => {
    try {
      setIsRemovingFromWishlist(true);
      const response = await fetch(`/api/wishlist/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist");
      }

      // Revalidate wishlist data
      await mutate();
      return true;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return false;
    } finally {
      setIsRemovingFromWishlist(false);
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return wishlistItems?.some((item) => item.productId === productId) ?? false;
  };

  return {
    wishlistItems,
    isLoading,
    hasError: !!error,
    isAddingToWishlist,
    isRemovingFromWishlist,
    totalItems: wishlistItems?.length ?? 0,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    mutate,
  };
}
