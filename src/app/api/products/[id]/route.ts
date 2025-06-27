import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils/api-error";
import { serializeProduct } from "@/lib/utils/serialize-product";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) {
      throw new ApiError("Product ID is required", 400);
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
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
    });

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    // Convert Decimal objects to numbers for serialization
    const serializedProduct = {
      ...product,
      price: Number(product.price),
      originalPrice: product.originalPrice
        ? Number(product.originalPrice)
        : null,
    };

    return NextResponse.json(serializedProduct);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      throw new ApiError("Product ID is required", 400);
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new ApiError("Product not found", 404);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price !== undefined ? body.price : undefined,
        originalPrice:
          body.originalPrice !== undefined ? body.originalPrice : undefined,
        discountPercentage:
          body.discountPercentage !== undefined
            ? body.discountPercentage
            : undefined,
        image: body.image,
        images: body.images,
        category: body.category,
        stock: body.stock !== undefined ? body.stock : undefined,
        rating: body.rating !== undefined ? body.rating : undefined,
        reviewCount:
          body.reviewCount !== undefined ? body.reviewCount : undefined,
        isActive: body.isActive !== undefined ? body.isActive : undefined,
      },
    });

    return NextResponse.json(serializeProduct(updatedProduct));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) {
      throw new ApiError("Product ID is required", 400);
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new ApiError("Product not found", 404);
    }

    await prisma.product.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
