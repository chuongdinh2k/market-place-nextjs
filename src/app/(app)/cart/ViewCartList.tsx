"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { checkout } from "@/actions/cart";
import CartItem from "./CartItem";

export default function ViewCartList() {
  const { cartItems, isLoading, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-black">
        <p className="text-lg">Loading cart...</p>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <p className="text-xl text-black">Your cart is empty</p>
        <Button
          variant="outline"
          className="text-black bg-white border-1 border-black hover:bg-red-500 hover:text-white cursor-pointer"
          asChild
        >
          <Link href="/shop" className="text-black">
            Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  const handleApplyCoupon = () => {
    // TODO: Implement coupon functionality
    console.log("Applying coupon:", couponCode);
  };

  const handleCheckout = async () => {
    await checkout();
  };
  return (
    <div className="flex flex-col space-y-20 w-full max-w-[1170px] mx-auto text-black">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-10">
          {/* Cart Header */}
          <Card className="w-full shadow-sm p-4 sm:p-6 lg:p-8 hidden md:block">
            <div className="flex items-center px-4 sm:px-6 lg:px-10 py-4 sm:py-6 gap-4 sm:gap-8 lg:gap-[284px]">
              <span className="font-normal text-base">Product</span>
              <span className="font-normal text-base">Price</span>
              <span className="font-normal text-base">Quantity</span>
              <span className="font-normal text-base">Subtotal</span>
            </div>
          </Card>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                ...item,
                product: {
                  ...item.product,
                  price: parseFloat(item.product.price),
                },
              }}
            />
          ))}
        </div>

        {/* Cart Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="text-black bg-white border-1 border-black hover:bg-red-500 hover:text-white cursor-pointer"
            asChild
          >
            <Link href="/shop">Return To Shop</Link>
          </Button>
          <Button
            variant="outline"
            className="text-black bg-white border-1 border-black hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Update Cart
          </Button>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Coupon */}
        <div className="flex flex-col sm:flex-row items-start gap-4 w-full lg:w-auto">
          <div className="border border-black rounded w-full sm:w-[300px] h-14 relative">
            <Input
              placeholder="Coupon Code"
              className="h-full border-none bg-white"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>
          <Button
            className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
            onClick={handleApplyCoupon}
          >
            Apply Coupon
          </Button>
        </div>

        {/* Cart Total */}
        <Card className="w-full lg:w-[470px] h-auto lg:h-[324px] border-black border-[1.5px] rounded">
          <div className="p-4 sm:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl font-medium mb-4 lg:mb-6">
              Cart Total
            </h3>

            <div className="flex justify-between mb-3 lg:mb-4">
              <span className="font-normal text-sm sm:text-base">
                Subtotal:
              </span>
              <span className="font-normal text-sm sm:text-base">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Separator className="my-3 lg:my-4 opacity-40" />

            <div className="flex justify-between mb-3 lg:mb-4">
              <span className="font-normal text-sm sm:text-base">
                Shipping:
              </span>
              <span className="font-normal text-sm sm:text-base">Free</span>
            </div>

            <Separator className="my-3 lg:my-4 opacity-40" />

            <div className="flex justify-between mb-4 lg:mb-6">
              <span className="font-normal text-sm sm:text-base">Total:</span>
              <span className="font-normal text-sm sm:text-base font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-center">
              <Button
                className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
                onClick={handleCheckout}
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
