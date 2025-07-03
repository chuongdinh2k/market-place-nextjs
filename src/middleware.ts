import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define which routes require authentication
const protectedRoutes = [
  "/dashboard",
  "/wishlist",
  "/orders",
  "/profile",
  "/cart",
];

// Define which routes require admin role
const adminRoutes = ["/dashboard", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route requires admin role
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // If the route is not protected, continue
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get the token from the cookie
  const token = request.cookies.get("auth_token")?.value;

  // If there is no token, redirect to login
  if (!token) {
    const url = new URL("/sign-up", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Verify the token using jose (Edge Runtime compatible)
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    const secret = new TextEncoder().encode(JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    const decoded = payload as {
      id: string;
      email: string;
      role: string;
    };

    // Check if the user has the required role for admin routes
    if (isAdminRoute && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Continue with the request
    return NextResponse.next();
  } catch (error) {
    // Log the error
    console.error("Authentication error in middleware:", error);

    // If the token is invalid, redirect to login
    const url = new URL("/sign-up", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/wishlist/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/cart/:path*",
  ],
};
