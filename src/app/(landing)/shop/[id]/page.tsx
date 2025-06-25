"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DisplayProductImages from "./DisplayProductImages";
import ViewProductInfo from "./ViewProductInfo";

const products = [
  {
    id: "1",
    name: "Havic HV G-92 Gamepad",
    images: {
      main: "/images/products/detail/main-product.jpg",
      thumbnails: [
        "/images/products/detail/thumbnail-1.jpg",
        "/images/products/detail/thumbnail-2.jpg",
        "/images/products/detail/thumbnail-3.jpg",
        "/images/products/detail/thumbnail-4.jpg",
      ],
    },
    price: 192,
    rating: 4,
    reviewCount: 150,
    inStock: true,
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    colors: [
      { name: "Red", value: "#E07575" },
      { name: "Blue", value: "#A0BCE0" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultSize: "M",
  },
  {
    id: "2",
    name: "AK-900 Wired Keyboard",
    images: {
      main: "/images/products/keyboard.jpg",
      thumbnails: [
        "https://picsum.photos/200/300",
        "/images/products/keyboard.jpg",
        "/images/products/keyboard.jpg",
        "/images/products/keyboard.jpg",
      ],
    },
    price: 960,
    originalPrice: 1160,
    discountPercentage: 35,
    rating: 4,
    reviewCount: 75,
    inStock: true,
    description:
      "High-quality mechanical keyboard with RGB backlighting and premium switches. Perfect for gaming and productivity.",
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
    ],
    sizes: ["S", "M", "L"],
    defaultSize: "M",
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-black/50 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <DisplayProductImages
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        {/* Product Info */}
        <ViewProductInfo product={product} />
      </div>
    </div>
  );
}
