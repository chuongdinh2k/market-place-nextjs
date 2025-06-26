import { Metadata } from "next";
import ProductList from "@/components/ProductList";

export const metadata: Metadata = {
  title: "Shop | Marketplace",
  description: "Browse our collection of products",
};

export default async function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>

      {/* Product filters and sorting would go here */}

      {/* Product grid */}
      <ProductList />
    </div>
  );
}
