"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormError } from "@/hooks/use-form-error";
import { ErrorMessage } from "@/components/ui/error-message";
import { register } from "@/actions/auth";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { addError, clearErrors, hasError, getFieldError, getGeneralErrors } =
    useFormError();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    // Validate form
    if (!name) {
      addError("Name is required", "name");
      return;
    }

    if (!email) {
      addError("Email is required", "email");
      return;
    }

    if (!password) {
      addError("Password is required", "password");
      return;
    }

    if (password.length < 6) {
      addError("Password must be at least 6 characters", "password");
      return;
    }

    if (password !== confirmPassword) {
      addError("Passwords do not match", "confirmPassword");
      return;
    }

    try {
      setIsLoading(true);

      // Call the register server action
      const result = await register({ name, email, password });

      if (!result.success) {
        addError(result.error || "Registration failed");
        return;
      }

      // Redirect on successful registration
      router.push("/");
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
    <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-sm text-black">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-500">
          Enter your details to create your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Display general errors */}
        {getGeneralErrors().map((error, index) => (
          <ErrorMessage key={index} message={error.message} className="mb-2" />
        ))}

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className={
              hasError("name")
                ? "border-red-500"
                : "border-inherit bg-white text-black"
            }
          />
          {getFieldError("name") && (
            <ErrorMessage message={getFieldError("name") || ""} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className={
              hasError("name")
                ? "border-red-500"
                : "border-inherit bg-white text-black"
            }
          />
          {getFieldError("email") && (
            <ErrorMessage message={getFieldError("email") || ""} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className={
              hasError("name")
                ? "border-red-500"
                : "border-inherit bg-white text-black"
            }
          />
          {getFieldError("password") && (
            <ErrorMessage message={getFieldError("password") || ""} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            className={
              hasError("name")
                ? "border-red-500"
                : "border-inherit bg-white text-black"
            }
          />
          {getFieldError("confirmPassword") && (
            <ErrorMessage message={getFieldError("confirmPassword") || ""} />
          )}
        </div>

        <Button
          type="submit"
          className="w-full border-1 border-red-500 text-red-500"
          disabled={isLoading}
        >
          <p className="text-red-500">
            {isLoading ? "Creating Account..." : "Register"}
          </p>
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <p>
          Already have an account?{" "}
          <a href="/sign-up" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
