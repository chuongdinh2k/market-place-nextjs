"use client";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";

// Sample product data
const products = [
  {
    id: "1",
    name: "AK-900 Wired Keyboard",
    image: "/images/products/keyboard.jpg",
    price: 960,
    originalPrice: 1160,
    discountPercentage: 35,
    rating: 4,
    reviewCount: 75,
  },
  {
    id: "2",
    name: "IPS LCD Gaming Monitor",
    image: "/images/products/keyboard.jpg", // Using same image as placeholder
    price: 1160,
    rating: 5,
    reviewCount: 99,
  },
  {
    id: "3",
    name: "RGB Liquid CPU Cooler",
    image: "/images/products/keyboard.jpg", // Using same image as placeholder
    price: 160,
    originalPrice: 170,
    discountPercentage: 5,
    rating: 3,
    reviewCount: 65,
  },
  {
    id: "4",
    name: "GP11 Shooter USB Gamepad",
    image: "/images/products/keyboard.jpg", // Using same image as placeholder
    price: 660,
    rating: 4,
    reviewCount: 55,
  },
  {
    id: "5",
    name: "Havit HV-G92 Gamepad",
    image: "/images/products/keyboard.jpg", // Using same image as placeholder
    price: 560,
    originalPrice: 660,
    discountPercentage: 15,
    rating: 5,
    reviewCount: 88,
  },
  {
    id: "6",
    name: "S-Series Comfort Chair",
    image: "/images/products/keyboard.jpg", // Using same image as placeholder
    price: 375,
    rating: 4,
    reviewCount: 99,
  },
  {
    id: "7",
    name: "Modern Sofa",
    image: "/images/products/keyboard.jpg", // Using same image as placeholder
    price: 1200,
    originalPrice: 1500,
    discountPercentage: 20,
    rating: 5,
    reviewCount: 150,
  },
  {
    id: "8",
    name: "Wireless Earbuds",
    image: "/images/products/keyboard.jpg", // Using same image as placeholder
    price: 120,
    rating: 3,
    reviewCount: 45,
  },
];

export default function ShopPage() {
  // These functions would typically connect to your cart/wishlist state management
  const handleAddToCart = (id: string) => {
    console.log(`Added product ${id} to cart`);
  };

  const handleAddToWishlist = (id: string) => {
    console.log(`Added product ${id} to wishlist`);
  };

  const router = useRouter();
  const handleQuickView = (id: string) => {
    router.push(`/shop/${id}`);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-8">Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            originalPrice={product.originalPrice}
            discountPercentage={product.discountPercentage}
            rating={product.rating}
            reviewCount={product.reviewCount}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onQuickView={handleQuickView}
          />
        ))}
      </div>
    </div>
  );
}
