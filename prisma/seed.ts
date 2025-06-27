import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create a test user
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
      role: "USER",
    },
  });

  console.log(`Created user: ${user.name} (${user.email})`);

  // Create test products
  const products = [
    {
      name: "LCD Monitor",
      description: "27-inch 4K LCD Monitor with HDR support",
      price: 650,
      originalPrice: 700,
      discountPercentage: 7,
      images: ["/images/products/detail/main-product.jpg"],
      image: "/images/products/detail/main-product.jpg",
      category: "Electronics",
      stock: 15,
      rating: 4.5,
      reviewCount: 120,
    },
    {
      name: "H1 Gamepad",
      description: "Wireless gaming controller with haptic feedback",
      price: 550,
      originalPrice: 600,
      discountPercentage: 8,
      images: ["/images/products/keyboard.jpg"],
      image: "/images/products/keyboard.jpg",
      category: "Gaming",
      stock: 25,
      rating: 4.8,
      reviewCount: 85,
    },
    {
      name: "Mechanical Keyboard",
      description: "RGB Mechanical Gaming Keyboard with Cherry MX switches",
      price: 150,
      originalPrice: 180,
      discountPercentage: 17,
      images: ["/images/products/keyboard.jpg"],
      image: "/images/products/keyboard.jpg",
      category: "Gaming",
      stock: 30,
      rating: 4.7,
      reviewCount: 64,
    },
    {
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with long battery life",
      price: 75,
      originalPrice: 90,
      discountPercentage: 17,
      images: ["/images/products/keyboard.jpg"],
      image: "/images/products/keyboard.jpg",
      category: "Electronics",
      stock: 45,
      rating: 4.3,
      reviewCount: 38,
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
      update: product,
      create: {
        id: product.name.toLowerCase().replace(/\s+/g, "-"),
        ...product,
      },
    });

    console.log(`Created product: ${createdProduct.name}`);
  }

  console.log(`Seeding completed successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
