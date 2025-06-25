import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Product {
  name: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  price: number;
  description: string;
  sizes: string[];
  colors: {
    name: string;
    value: string;
  }[];
}

export default function ViewProductInfo({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
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
              src="/images/products/detail/star.svg"
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
            product.inStock ? "text-green-500/60" : "text-red-500/60"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Price */}
      <div className="font-inter text-xl sm:text-2xl tracking-[0.03em] text-black">
        ${product.price.toFixed(2)}
      </div>

      {/* Description */}
      <p className="font-poppins text-xs sm:text-sm text-black leading-relaxed">
        {product.description}
      </p>

      <Separator className="my-4 sm:my-6" />

      {/* Color Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
        <span className="font-inter text-base sm:text-xl text-black">
          Colours:
        </span>
        <div className="flex gap-3 sm:gap-4">
          {product.colors.map((color, index) => (
            <button
              key={index}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full relative ${
                selectedColor === index ? "ring-1 ring-offset-2 ring-black" : ""
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedColor(index)}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
        <span className="font-inter text-base sm:text-xl text-black">
          Size:
        </span>
        <div className="flex gap-3 sm:gap-4">
          {product.sizes?.map((size: string, index: number) => (
            <button
              key={index}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border rounded-md text-xs sm:text-sm ${
                selectedSize === index
                  ? "bg-[#DB4444] text-white border-[#DB4444]"
                  : "border-black/50 text-black"
              }`}
              onClick={() => setSelectedSize(index)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-4 sm:my-6" />

      {/* Quantity and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Quantity Selector */}
        <div className="flex h-10 sm:h-11 border border-black/50 rounded-md overflow-hidden">
          <button
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
          </button>
          <div className="w-16 sm:w-20 flex items-center justify-center font-poppins font-medium text-lg sm:text-xl text-black">
            {quantity}
          </div>
          <button
            className="w-8 sm:w-10 flex items-center justify-center border-l border-black/50 bg-[#DB4444]"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Image
              src="/images/products/detail/plus.svg"
              alt="Increase quantity"
              width={12}
              height={12}
              className="invert sm:w-4 sm:h-4"
            />
          </button>
        </div>

        {/* Buy Now Button */}
        <Button className="bg-[#DB4444] hover:bg-[#DB4444]/90 text-white px-8 sm:px-12 h-10 sm:h-11 text-sm sm:text-base w-full sm:w-auto">
          Buy Now
        </Button>

        {/* Wishlist Button */}
        <button className="w-10 h-10 border border-black/50 rounded-md flex items-center justify-center">
          <Image
            src="/images/products/detail/wishlist.svg"
            alt="Add to wishlist"
            width={16}
            height={14}
            className="sm:w-5 sm:h-4"
          />
        </button>
      </div>

      {/* Delivery and Returns */}
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
                d="M33.3334 18.3335C32.9258 15.9562 31.8222 13.7581 30.1664 11.9895C28.5105 10.2209 26.3787 8.96057 24.0001 8.36498C21.6216 7.76939 19.1231 7.86639 16.8085 8.64235C14.4939 9.41832 12.4653 10.8345 11 12.7168"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66669 16.6665H16.6667V6.6665"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66669 21.6665C7.07426 24.0438 8.17786 26.2419 9.83369 28.0105C11.4895 29.7791 13.6213 31.0394 15.9999 31.635C18.3784 32.2306 20.8769 32.1336 23.1915 31.3576C25.5061 30.5817 27.5347 29.1655 29 27.2832"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M33.3334 23.3335H23.3334V33.3335"
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
