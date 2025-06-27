"use client";

import { Card } from "@/components/ui/card";
import { CartItem as CartItemType, useCart } from "@/hooks/use-cart";
import Image from "next/image";

export default function CartItem({ item }: { item: CartItemType }) {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <Card className="w-full shadow-sm p-4 sm:p-6">
      {/* Mobile Layout */}
      <div className="sm:hidden">
        {/* Header with remove button */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image
                src={item.product.image || "/images/products/keyboard.jpg"}
                alt={item.product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">
                {item.product.name}
              </h3>
              <p className="text-gray-600 text-sm">
                ${Number(item.product.price).toFixed(2)}
              </p>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.productId)}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Remove item"
          >
            <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
              <Image
                src="/icons/cart/cancel-icon.svg"
                alt="Remove"
                width={4}
                height={4}
                className="text-white"
              />
            </div>
          </button>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="border border-gray-300 rounded flex items-center">
            <button
              onClick={() =>
                handleQuantityChange(item.productId, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              className="p-2 hover:bg-gray-50 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Image
                src="/icons/cart/dropdown-icon.svg"
                alt="Decrease"
                width={12}
                height={12}
                className={item.quantity <= 1 ? "opacity-50" : ""}
              />
            </button>
            <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                handleQuantityChange(item.productId, item.quantity + 1)
              }
              className="p-2 hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              <Image
                src="/icons/cart/dropup-icon.svg"
                alt="Increase"
                width={12}
                height={12}
              />
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-sm font-medium">Subtotal:</span>
          <span className="text-lg font-semibold">
            ${(Number(item.product.price) * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center h-[102px] relative">
        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.productId)}
          className="absolute top-5 left-[30px] z-10"
          aria-label="Remove item"
        >
          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
            <Image
              src="/icons/cart/cancel-icon.svg"
              alt="Remove"
              width={6}
              height={6}
              className="text-white"
            />
          </div>
        </button>

        {/* Product */}
        <div className="flex items-center h-full">
          <div className="ml-[40px] flex items-center">
            <div className="w-[54px] h-[54px] relative flex-shrink-0">
              <Image
                src={item.product.image || "/images/products/keyboard.jpg"}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="ml-5 font-normal text-base">
              {item.product.name}
            </span>
          </div>

          {/* Price */}
          <span className="absolute left-[387px] font-normal text-base">
            ${Number(item.product.price).toFixed(2)}
          </span>

          {/* Quantity */}
          <div className="absolute left-[710px]">
            <div className="border border-black/40 rounded p-1.5 flex items-center">
              <span className="font-normal text-base mr-3 ml-1">
                {String(item.quantity).padStart(2, "0")}
              </span>
              <div className="flex flex-col">
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId, item.quantity + 1)
                  }
                  aria-label="Increase quantity"
                >
                  <Image
                    src="/icons/cart/dropup-icon.svg"
                    alt="Increase"
                    width={16}
                    height={16}
                  />
                </button>
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId, item.quantity - 1)
                  }
                  aria-label="Decrease quantity"
                  disabled={item.quantity <= 1}
                >
                  <Image
                    src="/icons/cart/dropdown-icon.svg"
                    alt="Decrease"
                    width={16}
                    height={16}
                    className={item.quantity <= 1 ? "opacity-50" : ""}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Subtotal */}
          <span className="absolute left-[1063px] font-normal text-base">
            ${(Number(item.product.price) * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
}
