import useSWR from "swr";
import { useState } from "react";
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
      await addToCart(productId, quantity);
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
      await removeFromCart(productId);
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
      await updateCartItemQuantity(productId, quantity);
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
      await clearCart();
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
