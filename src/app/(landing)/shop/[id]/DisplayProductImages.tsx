"use client";

import { useState } from "react";
import Image from "next/image";

interface DisplayProductImagesProps {
  mainImage: string;
  images: string[];
  productName: string;
}

export default function DisplayProductImages({
  mainImage,
  images,
  productName,
}: DisplayProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Use provided images or fallback to an array with just the main image
  const allImages = images?.length ? images : [mainImage];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Image (shows selected thumbnail) */}
      <div className="bg-[#F5F5F5] rounded-md overflow-hidden w-full lg:w-[500px] h-[400px] lg:h-[600px] relative order-1 lg:order-2">
        <Image
          src={allImages[selectedImage] || mainImage}
          alt={productName}
          fill
          className="object-contain p-6"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex flex-row lg:flex-col gap-4 order-2 lg:order-1">
        {allImages.map((image, index) => (
          <button
            key={index}
            className={`bg-[#F5F5F5] rounded-md overflow-hidden w-[80px] h-[80px] lg:w-[138px] lg:h-[138px] relative ${
              selectedImage === index ? "ring-2 ring-[#DB4444]" : ""
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-contain p-3"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
