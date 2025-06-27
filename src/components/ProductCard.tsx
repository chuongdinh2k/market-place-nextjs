"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Product } from "@/hooks/use-products";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  onRemove,
}: ProductCardProps) {
  const {
    id,
    name,
    image,
    price,
    originalPrice,
    discountPercentage,
    rating = 0,
    reviewCount = 0,
  } = product;
  const [isHovered, setIsHovered] = useState(false);

  // Generate an array of 5 stars for the rating
  const stars = Array.from({ length: 5 }, (_, index) => ({
    filled: index < Math.floor(rating),
  }));

  return (
    <div
      className="flex flex-col gap-4 w-[270px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image and Actions */}
      <div className="relative w-[270px] h-[250px] bg-[#F5F5F5] rounded-md overflow-hidden">
        {/* Discount Badge */}
        {discountPercentage && (
          <div className="absolute top-3 left-3 bg-[#DB4444] text-white py-1 px-3 rounded-md text-xs font-poppins">
            -{discountPercentage}%
          </div>
        )}

        {/* Action Buttons */}

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Remove Button */}
          {onRemove && (
            <button
              onClick={() => onRemove?.(id)}
              className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <Image
                src="/icons/trash-icon.svg"
                alt="Remove"
                width={24}
                height={24}
              />
            </button>
          )}
          {/* Wishlist Button */}
          {onAddToWishlist && (
            <button
              onClick={() => onAddToWishlist?.(id)}
              className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <Image
                src="/icons/wishlist-icon.svg"
                alt="Add to wishlist"
                width={16}
                height={14}
              />
            </button>
          )}
          {/* Quick View Button */}
          <button
            onClick={() => onQuickView?.(id)}
            className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <Image
              src="/icons/eye-icon.svg"
              alt="Quick view"
              width={20}
              height={14}
            />
          </button>
        </div>

        {/* Product Image */}
        <div className="flex items-center justify-center h-full p-5">
          <Image
            src={image || "/images/products/keyboard.jpg"}
            alt={name}
            width={190}
            height={180}
            className="object-contain"
          />
        </div>

        {/* Add to Cart Button (visible on hover) */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-black h-[41px] flex items-center justify-center transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            onClick={() => onAddToCart?.(id)}
            className="text-white font-poppins font-medium text-base"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2">
        {/* Product Name */}
        <h3 className="font-poppins font-medium text-base text-black line-clamp-1">
          {name}
        </h3>

        {/* Price */}
        <div className="flex gap-3">
          <span className="font-poppins font-medium text-base text-[#DB4444]">
            ${price}
          </span>

          {originalPrice && (
            <span className="font-poppins font-medium text-base text-black/50 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {stars.map((star, index) => (
              <Image
                key={index}
                src="/icons/star-icon.svg"
                alt="star"
                width={20}
                height={20}
                className={star.filled ? "" : "opacity-25"}
              />
            ))}
          </div>
          <span className="font-poppins font-semibold text-sm text-black/50">
            ({reviewCount})
          </span>
        </div>
      </div>
    </div>
  );
}
