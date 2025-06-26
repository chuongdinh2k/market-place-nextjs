"use client";

import { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stock: number;
}

export default function ViewProductInfo({
  product,
}: {
  product: ProductProps;
}) {
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();
  const wishlist = useWishlist();

  const inStock = product.stock > 0;

  // Use optional chaining for all hook methods
  const isInWishlist =
    wishlist?.wishlistItems?.some((item) => item.productId === product.id) ||
    false;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (product.stock && newQuantity > product.stock) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (cart?.addToCart) {
      await cart.addToCart(product.id, quantity);
    }
  };

  const handleWishlistToggle = async () => {
    if (isInWishlist && wishlist?.removeFromWishlist) {
      await wishlist.removeFromWishlist(product.id);
    } else if (wishlist?.addToWishlist) {
      await wishlist.addToWishlist(product.id);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="font-inter text-lg sm:text-xl lg:text-2xl font-semibold tracking-[0.03em] text-black">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              src="/icons/star-icon.svg"
              alt="star"
              width={16}
              height={16}
              className={`${
                index < product.rating ? "" : "opacity-25"
              } sm:w-5 sm:h-5`}
            />
          ))}
        </div>
        <span className="text-xs sm:text-sm text-black/50 font-poppins">
          ({product.reviewCount} Reviews)
        </span>
        <Separator orientation="vertical" className="h-3 sm:h-4" />
        <span
          className={`text-xs sm:text-sm font-poppins ${
            inStock ? "text-green-500/60" : "text-red-500/60"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="font-inter text-xl sm:text-2xl tracking-[0.03em] text-[#DB4444]">
          ${product.price.toFixed(2)}
        </span>

        {product.originalPrice && (
          <span className="font-inter text-lg sm:text-xl tracking-[0.03em] text-black/50 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}

        {product.discountPercentage && (
          <span className="bg-[#DB4444] text-white py-1 px-3 rounded-md text-xs font-poppins">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      {/* Description */}
      <p className="font-poppins text-xs sm:text-sm text-black leading-relaxed">
        {product.description}
      </p>

      <Separator className="my-4 sm:my-6" />

      {/* Quantity and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Quantity Selector */}
        <div className="flex h-10 sm:h-11 border border-black/50 rounded-md overflow-hidden">
          <Button
            className="w-8 sm:w-10 flex items-center justify-center border-r border-black/50"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Image
              src="/images/products/detail/minus.svg"
              alt="Decrease quantity"
              width={12}
              height={2}
              className="sm:w-4 sm:h-0.5"
            />
          </Button>
          <div className="w-16 sm:w-20 flex items-center justify-center font-poppins font-medium text-lg sm:text-xl text-black">
            {quantity}
          </div>
          <Button
            className="w-8 sm:w-10 flex items-center justify-center border-l border-black/50 bg-[#DB4444]"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={!!(product.stock && quantity >= product.stock)}
          >
            <Image
              src="/images/products/detail/plus.svg"
              alt="Increase quantity"
              width={12}
              height={12}
              className="invert sm:w-4 sm:h-4"
            />
          </Button>
        </div>

        {/* Buy Now Button */}
        <Button
          className="bg-[#DB4444] hover:bg-[#DB4444]/90 text-white px-8 sm:px-12 h-10 sm:h-11 text-sm sm:text-base w-full sm:w-auto"
          onClick={handleAddToCart}
          disabled={cart?.isAddingToCart || !inStock}
        >
          {cart?.isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>

        {/* Wishlist Button */}
        <button
          className={`w-10 h-10 border rounded-md flex items-center justify-center ${
            isInWishlist ? "bg-[#DB4444] border-[#DB4444]" : "border-black/50"
          }`}
          onClick={handleWishlistToggle}
          disabled={wishlist?.isAddingToWishlist}
        >
          <Image
            src="/images/products/detail/wishlist.svg"
            alt={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            width={16}
            height={14}
            className={`sm:w-5 sm:h-4 ${isInWishlist ? "invert" : ""}`}
          />
        </button>
      </div>

      {/* Delivery Info */}
      <div className="mt-6 sm:mt-8 border border-black/50 rounded-md p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Free Delivery */}
        <div className="flex gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 text-black">
            <svg
              width="32"
              height="32"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-10 sm:h-10"
            >
              <path
                d="M11.6667 31.6667C13.5076 31.6667 15 30.1743 15 28.3333C15 26.4924 13.5076 25 11.6667 25C9.82572 25 8.33331 26.4924 8.33331 28.3333C8.33331 30.1743 9.82572 31.6667 11.6667 31.6667Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33331 28.3335H6.99998C5.89541 28.3335 4.99998 27.4381 4.99998 26.3335V21.6668M3.33331 8.3335H19.6666C20.7712 8.3335 21.6666 9.22893 21.6666 10.3335V28.3335M15 28.3335H25M31.6667 28.3335H33C34.1046 28.3335 35 27.4381 35 26.3335V18.3335M35 18.3335H21.6666M35 18.3335L30 10.3335H21.6666"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33331 15.0002H11.6666"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 11.6665H8.33333"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33331 18.3335H13.3333"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-poppins font-medium text-sm sm:text-base text-black">
              Free Delivery
            </h3>
            <p className="font-poppins text-xs text-black">
              Enter your postal code for Delivery Availability
            </p>
          </div>
        </div>

        <Separator />

        {/* Return Delivery */}
        <div className="flex gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 text-black">
            <svg
              width="32"
              height="32"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-10 sm:h-10"
            >
              <path
                d="M33.3333 18.3335C33.3333 26.6668 20 33.3335 20 33.3335C20 33.3335 6.66666 26.6668 6.66666 18.3335C6.66666 14.6975 8.10564 11.2108 10.6561 8.66032C13.2066 6.10983 16.6933 4.67085 20.3293 4.67085C23.9653 4.67085 27.452 6.10983 30.0025 8.66032C32.553 11.2108 33.992 14.6975 33.992 18.3335H33.3333Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 23.3335C22.7614 23.3335 25 21.0949 25 18.3335C25 15.5721 22.7614 13.3335 20 13.3335C17.2386 13.3335 15 15.5721 15 18.3335C15 21.0949 17.2386 23.3335 20 23.3335Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-poppins font-medium text-sm sm:text-base text-black">
              Return Delivery
            </h3>
            <p className="font-poppins text-xs text-black">
              Free 30 Days Delivery Returns. Details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
