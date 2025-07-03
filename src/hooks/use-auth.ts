"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";
import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
} from "@/actions/auth";
import type { LoginFormData, RegisterFormData } from "@/actions/auth";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: "USER" | "ADMIN";
}

export function useAuth() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User | null>("/api/auth/me", fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
    shouldRetryOnError: false,
    onError: (err) => {
      console.error("Auth error:", err);
    },
  });

  // Check if user is authenticated
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  // Login function
  const login = async (
    { email, password }: LoginFormData,
    callbackUrl?: string
  ) => {
    try {
      setIsLoggingIn(true);
      const result = await loginAction({ email, password });

      if (result.success) {
        // Update the cache with the new user data
        await mutate();

        // Use provided callbackUrl or check URL params for callbackUrl
        const redirectUrl =
          callbackUrl || searchParams.get("callbackUrl") || "/";
        router.push(redirectUrl); // Navigate to callback URL or home after successful login
      }

      return result;
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Register function
  const register = async (
    { name, email, password }: RegisterFormData,
    callbackUrl?: string
  ) => {
    try {
      setIsRegistering(true);
      const result = await registerAction({ name, email, password });

      if (result.success) {
        // Update the cache with the new user data
        await mutate();

        // Use provided callbackUrl or check URL params for callbackUrl
        const redirectUrl =
          callbackUrl || searchParams.get("callbackUrl") || "/";
        router.push(redirectUrl); // Navigate to callback URL or home after successful registration
      }

      return result;
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      };
    } finally {
      setIsRegistering(false);
    }
  };

  // Logout function with improved state management
  const logout = async () => {
    try {
      setIsLoggingOut(true);

      // First, update the local state immediately to prevent UI lag
      await mutate(null, false);

      // Then call the server action to clear the cookie
      await logoutAction();

      // Finally, navigate to home page
      router.push("/");

      return true;
    } catch (error) {
      console.error("Logout error:", error);
      // Even if server logout fails, we should still clear local state
      await mutate(null, false);
      router.push("/");
      return false;
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    user,
    isLoading,
    hasError: !!error,
    isAuthenticated,
    isAdmin,
    isLoggingIn,
    isRegistering,
    isLoggingOut,
    login,
    register,
    logout,
    mutate,
  };
}
