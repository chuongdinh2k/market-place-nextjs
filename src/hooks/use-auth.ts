"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const login = async ({ email, password }: LoginFormData) => {
    try {
      setIsLoggingIn(true);
      const result = await loginAction({ email, password });

      if (result.success) {
        await mutate();
        router.refresh();
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
  const register = async ({ name, email, password }: RegisterFormData) => {
    try {
      setIsRegistering(true);
      const result = await registerAction({ name, email, password });

      if (result.success) {
        await mutate();
        router.refresh();
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

  // Logout function
  const logout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutAction();
      await mutate(null, false);
      router.refresh();
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
