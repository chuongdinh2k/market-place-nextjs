"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormError } from "@/hooks/use-form-error";
import { ErrorMessage } from "@/components/ui/error-message";
import { login } from "@/actions/auth";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addError, clearErrors, hasError, getFieldError, getGeneralErrors } =
    useFormError();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    // Validate form
    if (!email) {
      addError("Email is required", "email");
      return;
    }

    if (!password) {
      addError("Password is required", "password");
      return;
    }

    try {
      setIsLoading(true);

      // Call the login server action
      const result = await login({ email, password });

      if (!result.success) {
        addError(result.error || "Login failed");
        return;
      }

      // Redirect on successful login
      router.push(callbackUrl);
      router.refresh(); // Refresh the page to update the UI
    } catch (error) {
      addError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-black">Login</h1>
        <p className="text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Display general errors */}
        {getGeneralErrors().map((error, index) => (
          <ErrorMessage key={index} message={error.message} className="mb-2" />
        ))}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-black">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className={
              hasError("password")
                ? "border-red-500"
                : "border-inherit bg-white text-black"
            }
          />
          {getFieldError("email") && (
            <ErrorMessage message={getFieldError("email") || ""} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-black">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="off"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className={
              hasError("password")
                ? "border-red-500"
                : "border-inherit bg-white text-black"
            }
          />
          {getFieldError("password") && (
            <ErrorMessage message={getFieldError("password") || ""} />
          )}
        </div>

        <Button
          type="submit"
          className="w-full border-1 border-red-500 text-red-500"
          disabled={isLoading}
        >
          <p className="text-red-500">
            {isLoading ? "Logging in..." : "Login"}
          </p>
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-black">
        <p>
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
