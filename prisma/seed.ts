import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "$2a$10$GmQzRpkfkPpSQeB.hv.xHOO9Ld5GMaDB5Kh.3XeRHO9EgWR6jJUYW", // password123
      role: "ADMIN",
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      name: "Regular User",
      email: "user@example.com",
      password: "$2a$10$GmQzRpkfkPpSQeB.hv.xHOO9Ld5GMaDB5Kh.3XeRHO9EgWR6jJUYW", // password123
      role: "USER",
    },
  });

  console.log(`Created users: ${adminUser.name}, ${regularUser.name}`);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "AK-900 Wired Keyboard",
        description:
          "High-quality mechanical keyboard with RGB backlighting and premium switches. Perfect for gaming and productivity.",
        price: 960,
        originalPrice: 1160,
        discountPercentage: 35,
        image: "/images/products/keyboard.jpg",
        images: ["/images/products/keyboard.jpg"],
        category: "Electronics",
        stock: 50,
        rating: 4,
        reviewCount: 75,
      },
    }),
    prisma.product.create({
      data: {
        name: "IPS LCD Gaming Monitor",
        description:
          "24-inch IPS LCD monitor with 144Hz refresh rate, 1ms response time, and HDR support. Perfect for gaming and multimedia.",
        price: 1160,
        category: "Electronics",
        stock: 30,
        rating: 5,
        reviewCount: 99,
        image: "/images/products/keyboard.jpg", // Using placeholder image
        images: ["/images/products/keyboard.jpg"],
      },
    }),
    prisma.product.create({
      data: {
        name: "RGB Liquid CPU Cooler",
        description:
          "Advanced liquid cooling solution with RGB lighting, compatible with most modern CPU sockets.",
        price: 160,
        originalPrice: 170,
        discountPercentage: 5,
        category: "Computer Parts",
        stock: 45,
        rating: 3,
        reviewCount: 65,
        image: "/images/products/keyboard.jpg", // Using placeholder image
        images: ["/images/products/keyboard.jpg"],
      },
    }),
    prisma.product.create({
      data: {
        name: "GP11 Shooter USB Gamepad",
        description:
          "Ergonomic gamepad with USB connection, programmable buttons, and vibration feedback.",
        price: 660,
        category: "Gaming",
        stock: 100,
        rating: 4,
        reviewCount: 55,
        image: "/images/products/keyboard.jpg", // Using placeholder image
        images: ["/images/products/keyboard.jpg"],
      },
    }),
    prisma.product.create({
      data: {
        name: "Havic HV-G92 Gamepad",
        description:
          "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
        price: 560,
        originalPrice: 660,
        discountPercentage: 15,
        category: "Gaming",
        stock: 75,
        rating: 5,
        reviewCount: 88,
        image: "/images/products/detail/main-product.jpg",
        images: [
          "/images/products/detail/main-product.jpg",
          "/images/products/detail/thumbnail-1.jpg",
          "/images/products/detail/thumbnail-2.jpg",
          "/images/products/detail/thumbnail-3.jpg",
          "/images/products/detail/thumbnail-4.jpg",
        ],
      },
    }),
    prisma.product.create({
      data: {
        name: "S-Series Comfort Chair",
        description:
          "Ergonomic office chair with lumbar support, adjustable height, and breathable mesh back.",
        price: 375,
        category: "Furniture",
        stock: 20,
        rating: 4,
        reviewCount: 99,
        image: "/images/products/keyboard.jpg", // Using placeholder image
        images: ["/images/products/keyboard.jpg"],
      },
    }),
    prisma.product.create({
      data: {
        name: "Modern Sofa",
        description:
          "Contemporary sofa with premium upholstery, sturdy frame, and comfortable cushions.",
        price: 1200,
        originalPrice: 1500,
        discountPercentage: 20,
        category: "Furniture",
        stock: 15,
        rating: 5,
        reviewCount: 150,
        image: "/images/products/keyboard.jpg", // Using placeholder image
        images: ["/images/products/keyboard.jpg"],
      },
    }),
    prisma.product.create({
      data: {
        name: "Wireless Earbuds",
        description:
          "True wireless earbuds with noise cancellation, touch controls, and long battery life.",
        price: 120,
        category: "Audio",
        stock: 200,
        rating: 3,
        reviewCount: 45,
        image: "/images/products/keyboard.jpg", // Using placeholder image
        images: ["/images/products/keyboard.jpg"],
      },
    }),
  ]);

  console.log(`Created ${products.length} products`);

  // Create cart items
  await prisma.cartItem.create({
    data: {
      userId: regularUser.id,
      productId: products[0].id,
      quantity: 2,
    },
  });

  console.log(`Created cart item for ${regularUser.name}`);

  // Create wishlist items
  await prisma.wishlistItem.create({
    data: {
      userId: regularUser.id,
      productId: products[1].id,
    },
  });

  console.log(`Created wishlist item for ${regularUser.name}`);

  // Create an order
  await prisma.order.create({
    data: {
      userId: regularUser.id,
      status: "DELIVERED",
      total: 1920, // 2 * 960
      orderItems: {
        create: [
          {
            productId: products[0].id,
            quantity: 2,
            price: 960,
          },
        ],
      },
    },
  });

  console.log(`Created order for ${regularUser.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
