"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// Constants
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const COOKIE_NAME = "auth_token";
const TOKEN_EXPIRY = 60 * 60 * 24 * 7; // 7 days

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Types
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AuthResult = {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    name?: string | null;
    role: string;
  };
};

/**
 * Login a user
 */
export async function login(formData: LoginFormData): Promise<AuthResult> {
  try {
    // Validate input
    const validatedFields = loginSchema.safeParse(formData);
    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.errors[0].message,
      };
    }

    const { email, password } = validatedFields.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password" };
    }

    // Generate JWT token using jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + TOKEN_EXPIRY)
      .sign(secret);

    // Set cookie
    (
      await // Set cookie
      cookies()
    ).set(COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: TOKEN_EXPIRY,
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "An error occurred during login",
    };
  }
}

/**
 * Register a new user
 */
export async function register(
  formData: RegisterFormData
): Promise<AuthResult> {
  try {
    // Validate input
    const validatedFields = registerSchema.safeParse(formData);
    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.errors[0].message,
      };
    }

    const { name, email, password } = validatedFields.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Email already in use" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    // Generate JWT token using jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + TOKEN_EXPIRY)
      .sign(secret);

    // Set cookie
    (
      await // Set cookie
      cookies()
    ).set(COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: TOKEN_EXPIRY,
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "An error occurred during registration",
    };
  }
}

/**
 * Logout a user
 */
export async function logout() {
  (await cookies()).delete(COOKIE_NAME);
  redirect("/");
}

/**
 * Get the current user from the token
 */
export async function getCurrentUser() {
  try {
    const token = (await cookies()).get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    // Verify token using jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const decoded = payload as {
      id: string;
      email: string;
      role: string;
    };

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}
