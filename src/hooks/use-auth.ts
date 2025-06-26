"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

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

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User | null>("/api/auth/me", fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
    shouldRetryOnError: false,
  });

  // Check if user is authenticated
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoggingIn(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      // Revalidate user data
      await mutate();
      return { success: true };
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
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsRegistering(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      // Revalidate user data
      await mutate();
      return { success: true };
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

  // Logout function
  const logout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Set user to null
      await mutate(null, false);
      return true;
    } catch (error) {
      console.error("Logout error:", error);
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
