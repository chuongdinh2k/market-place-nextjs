/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/actions/wishlist.ts
"use server";
import { prisma } from "@/lib/prisma";
import { serializeProducts } from "@/lib/utils/serialize-product";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/actions/auth";

// Helper function to get user ID (if logged in)
async function getUserIdentifier() {
  // Try to get the current user from auth
  const user = await getCurrentUser();

  // If user is logged in, return their ID
  if (user?.id) {
    return { userId: user.id, isGuest: false };
  }

  // If no user is logged in, return null
  return { userId: null, isGuest: true };
}

export async function getWishlist(userId: string) {
  try {
    const items = await prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return { success: true, data: serializeProducts(items) };
  } catch (error) {
    return { success: false, error: "Failed to fetch wishlist" };
  }
}

export async function addToWishlist(productId: string, userId: string) {
  try {
    // Check if user is authenticated
    const { userId: authenticatedUserId, isGuest } = await getUserIdentifier();

    // For guest users, return an error
    if (isGuest || !authenticatedUserId) {
      return { success: false, error: "User not authenticated" };
    }

    await prisma.wishlistItem.create({
      data: {
        userId: authenticatedUserId,
        productId,
      },
    });

    revalidatePath("/wishlist");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add to wishlist" };
  }
}

export async function removeFromWishlist(productId: string, userId: string) {
  try {
    // Check if user is authenticated
    const { userId: authenticatedUserId, isGuest } = await getUserIdentifier();

    // For guest users, return an error
    if (isGuest || !authenticatedUserId) {
      return { success: false, error: "User not authenticated" };
    }

    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: authenticatedUserId,
          productId,
        },
      },
    });

    revalidatePath("/wishlist");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to remove from wishlist" };
  }
}
