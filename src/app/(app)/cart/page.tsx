import { Metadata } from "next";
import ViewCartList from "./ViewCartList";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "View and manage your shopping cart items",
};

export default function CartPage() {
  return (
    <main className="container py-8">
      <div className="mb-8">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/cart", label: "Cart" },
          ]}
          variant="default"
          size="md"
          showHomeIcon={true}
        />
      </div>
      <ViewCartList />
    </main>
  );
}
