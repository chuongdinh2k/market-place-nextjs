import { Product } from "@prisma/client";

export function serializeProduct(product: Product) {
  return {
    ...product,
    price: Number(product.price),
    originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
  };
}

export function serializeProducts(products: Product[]) {
  return products.map(serializeProduct);
}
