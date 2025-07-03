import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "./use-products";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  getCartItems,
} from "@/actions/cart";
import { useAuth } from "./use-auth";

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export function useCart() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isRemovingFromCart, setIsRemovingFromCart] = useState(false);

  const fetchCartItems = async () => {
    if (!user?.id) return [];
    const result = await getCartItems(user.id);
    console.log("result", result);
    if (result.success) return result.data;
    throw new Error(result.error);
  };

  // Use SWR with the server action directly
  const {
    data: cartItems,
    error,
    isLoading,
    mutate,
  } = useSWR(user?.id ? ["cart-items", user.id] : null, fetchCartItems);

  // Add item to cart using server action
  const addItem = async (productId: string, quantity: number = 1) => {
    try {
      setIsAddingToCart(true);

      // Check if user is logged in
      if (!user?.id) {
        // Get current URL to use as callback after login
        const currentPath = window.location.pathname;
        // Redirect to sign-up with callback URL
        router.push(`/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`);
        return false;
      }

      const result = await addToCart(productId, quantity);

      if (!result.success) {
        // If the error is due to authentication, redirect to login
        if (result.error === "User not authenticated") {
          const currentPath = window.location.pathname;
          router.push(
            `/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`
          );
        }
        return false;
      }

      await mutate(); // Revalidate cart data
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Remove item from cart using server action
  const removeItem = async (productId: string) => {
    try {
      setIsRemovingFromCart(true);

      // Check if user is logged in
      if (!user?.id) {
        // Get current URL to use as callback after login
        const currentPath = window.location.pathname;
        // Redirect to sign-up with callback URL
        router.push(`/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`);
        return false;
      }

      const result = await removeFromCart(productId);

      if (!result.success) {
        // If the error is due to authentication, redirect to login
        if (result.error === "User not authenticated") {
          const currentPath = window.location.pathname;
          router.push(
            `/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`
          );
        }
        return false;
      }

      await mutate(); // Revalidate cart data
      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
      return false;
    } finally {
      setIsRemovingFromCart(false);
    }
  };

  // Update item quantity using server action
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      // Check if user is logged in
      if (!user?.id) {
        // Get current URL to use as callback after login
        const currentPath = window.location.pathname;
        // Redirect to sign-up with callback URL
        router.push(`/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`);
        return false;
      }

      const result = await updateCartItemQuantity(productId, quantity);

      if (!result.success) {
        // If the error is due to authentication, redirect to login
        if (result.error === "User not authenticated") {
          const currentPath = window.location.pathname;
          router.push(
            `/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`
          );
        }
        return false;
      }

      await mutate(); // Revalidate cart data
      return true;
    } catch (error) {
      console.error("Error updating quantity:", error);
      return false;
    }
  };

  // Clear cart using server action
  const emptyCart = async () => {
    try {
      // Check if user is logged in
      if (!user?.id) {
        // Get current URL to use as callback after login
        const currentPath = window.location.pathname;
        // Redirect to sign-up with callback URL
        router.push(`/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`);
        return false;
      }

      const result = await clearCart();

      if (!result.success) {
        // If the error is due to authentication, redirect to login
        if (result.error === "User not authenticated") {
          const currentPath = window.location.pathname;
          router.push(
            `/sign-up?callbackUrl=${encodeURIComponent(currentPath)}`
          );
        }
        return false;
      }

      await mutate([]); // Clear local data
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return false;
    }
  };

  // Calculate total price
  const totalPrice =
    cartItems?.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0) || 0;

  // Calculate total items
  const totalItems =
    cartItems?.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0) || 0;

  return {
    cartItems,
    isLoading,
    hasError: !!error,
    isAddingToCart,
    isRemovingFromCart,
    totalPrice,
    totalItems,
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity,
    clearCart: emptyCart,
    mutate,
  };
}
