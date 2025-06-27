/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/actions/wishlist.ts
"use server";
import { prisma } from "@/lib/prisma";
import { serializeProducts } from "@/lib/utils/serialize-product";
import { revalidatePath } from "next/cache";

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
    await prisma.wishlistItem.create({
      data: {
        userId,
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
    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId,
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
