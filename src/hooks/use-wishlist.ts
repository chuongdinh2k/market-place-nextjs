"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/actions/wishlist";
import { useAuth } from "@/hooks/use-auth"; // Assuming you have a way to get userId
import { Product } from "./use-products";

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

export function useWishlist() {
  const { user } = useAuth(); // Get userId from auth context/session
  const router = useRouter();

  // SWR fetcher using server action
  const fetchWishlist = async () => {
    if (!user?.id) return [];
    const result = await getWishlist(user.id);
    if (result.success) return result.data;
    throw new Error(result.error);
  };

  const {
    data: wishlistItems,
    error,
    isLoading,
    mutate,
  } = useSWR(user?.id ? ["wishlist", user.id] : null, fetchWishlist);

  // Add item to wishlist
  const handleAddToWishlist = async (productId: string) => {
    if (!user?.id) {
      // Get current URL to use as callback after login
      const currentPath = window.location.pathname;
      // Redirect to sign-up with callback URL
      router.push(`/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`);
      return false;
    }

    const result = await addToWishlist(productId, user.id);
    if (result.success) {
      await mutate();
      return true;
    }

    // If the error is due to authentication, redirect to login
    if (result.error === "User not authenticated") {
      const currentPath = window.location.pathname;
      router.push(`/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`);
    }

    return false;
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = async (productId: string) => {
    if (!user?.id) {
      // Get current URL to use as callback after login
      const currentPath = window.location.pathname;
      // Redirect to sign-up with callback URL
      router.push(`/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`);
      return false;
    }

    const result = await removeFromWishlist(productId, user.id);
    if (result.success) {
      await mutate();
      return true;
    }

    // If the error is due to authentication, redirect to login
    if (result.error === "User not authenticated") {
      const currentPath = window.location.pathname;
      router.push(`/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`);
    }

    return false;
  };

  const isInWishlist = (productId: string) =>
    wishlistItems?.some((item) => item.productId === productId) ?? false;

  return {
    wishlistItems,
    isLoading,
    hasError: !!error,
    addToWishlist: handleAddToWishlist,
    removeFromWishlist: handleRemoveFromWishlist,
    isInWishlist,
    mutate,
    error,
  };
}
