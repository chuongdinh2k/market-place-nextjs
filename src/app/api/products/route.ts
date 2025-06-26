import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils/api-error";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        originalPrice: true,
        discountPercentage: true,
        image: true,
        images: true,
        category: true,
        rating: true,
        reviewCount: true,
        stock: true,
        isActive: true,
        createdAt: true,
      },
      where: {
        isActive: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name) {
      throw new ApiError("Product name is required", 400);
    }

    if (!body.price) {
      throw new ApiError("Product price is required", 400);
    }

    if (!body.category) {
      throw new ApiError("Product category is required", 400);
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        originalPrice: body.originalPrice,
        discountPercentage: body.discountPercentage,
        image: body.image,
        images: body.images || [],
        category: body.category,
        stock: body.stock || 0,
        rating: body.rating || 0,
        reviewCount: body.reviewCount || 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
