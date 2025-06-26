"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";
import { Product } from "./use-products";

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export function useCart() {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isRemovingFromCart, setIsRemovingFromCart] = useState(false);

  const {
    data: cartItems,
    error,
    isLoading,
    mutate,
  } = useSWR<CartItem[]>("/api/cart", fetcher);
  console.log("cartItems", cartItems);
  // Add item to cart
  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      setIsAddingToCart(true);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Revalidate cart data
      await mutate();
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    try {
      setIsRemovingFromCart(true);
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      // Revalidate cart data
      await mutate();
      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
      return false;
    } finally {
      setIsRemovingFromCart(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      // Revalidate cart data
      await mutate();
      return true;
    } catch (error) {
      console.error("Error updating quantity:", error);
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
    addToCart,
    removeFromCart,
    updateQuantity,
    mutate,
  };
}
