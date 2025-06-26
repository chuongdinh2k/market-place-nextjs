import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetail from "./ProductDetail";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Marketplace`,
    description: product.description || `Details about ${product.name}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  // Server-side fetch for initial data (better SEO)
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  // Convert decimal values to numbers for client component
  const productData = {
    id: product.id,
    name: product.name,
    description: product.description || "",
    price: Number(product.price),
    originalPrice: product.originalPrice
      ? Number(product.originalPrice)
      : undefined,
    discountPercentage: product.discountPercentage || undefined,
    rating: Number(product.rating),
    reviewCount: product.reviewCount,
    stock: product.stock,
    image: product.image || "",
    images: product.images,
  };

  return <ProductDetail product={productData} />;
}
