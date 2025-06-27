"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/actions/auth";

// Helper function to get user ID (if logged in) or generate a guest ID from cookies
async function getUserIdentifier() {
  // Try to get the current user from auth
  const user = await getCurrentUser();

  // If user is logged in, return their ID
  if (user?.id) {
    return { userId: user.id, isGuest: false };
  }

  // Otherwise, use a cookie to track guest cart
  const cookieStore = cookies();
  let guestId = (await cookieStore).get("guestId")?.value;

  if (!guestId) {
    guestId = `guest_${Math.random().toString(36).substring(2, 15)}`;
    (await cookieStore).set("guestId", guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  }

  return { userId: guestId, isGuest: true };
}

// Get cart items
export async function getCartItems(userId: string) {
  // For authenticated users, get cart items with product details
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the response to match the expected structure
    const formattedItems = cartItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price.toString(),
        image: item.product.image || undefined,
        description: item.product.description || undefined,
      },
    }));
    return { success: true, data: formattedItems };
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return { success: false, error: "Failed to fetch cart items" };
  }
}

// Add item to cart
export async function addToCart(productId: string, quantity: number = 1) {
  const { userId, isGuest } = await getUserIdentifier();

  // For guest users (implement guest cart logic if needed)
  if (isGuest) {
    // For now, we'll just return success without storing
    return { success: true };
  }

  try {
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingItem) {
      // Update quantity if item exists
      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      // Create new cart item if it doesn't exist
      await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });
    }

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, error: "Failed to add item to cart" };
  }
}

// Remove item from cart
export async function removeFromCart(productId: string) {
  const { userId, isGuest } = await getUserIdentifier();

  // For guest users
  if (isGuest) {
    return { success: true };
  }

  try {
    // Find the cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!cartItem) {
      return { success: false, error: "Item not found in cart" };
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { success: false, error: "Failed to remove item from cart" };
  }
}

// Update item quantity
export async function updateCartItemQuantity(
  productId: string,
  quantity: number
) {
  if (quantity < 1) {
    return removeFromCart(productId);
  }

  const { userId, isGuest } = await getUserIdentifier();

  // For guest users
  if (isGuest) {
    return { success: true };
  }

  try {
    // Find the cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!cartItem) {
      return { success: false, error: "Item not found in cart" };
    }

    // Update the quantity
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity,
      },
    });

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return { success: false, error: "Failed to update quantity" };
  }
}

// Clear cart
export async function clearCart() {
  const { userId, isGuest } = await getUserIdentifier();

  // For guest users
  if (isGuest) {
    return { success: true };
  }

  try {
    // Delete all cart items for the user
    await prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, error: "Failed to clear cart" };
  }
}

// Checkout action
export async function checkout() {
  const { userId, isGuest } = await getUserIdentifier();

  // Guest users can't checkout (they should sign in first)
  if (isGuest) {
    // Redirect to login page
    redirect("/sign-up?redirect=/cart");
  }

  try {
    // Get all cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return { success: false, error: "Cart is empty" };
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // Clear cart after successful order creation
    await prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    revalidatePath("/cart");
    revalidatePath("/orders");

    // Redirect to order confirmation page
    redirect(`/checkout/success?orderId=${order.id}`);
  } catch (error) {
    console.error("Error during checkout:", error);
    return { success: false, error: "Failed to process checkout" };
  }
}
