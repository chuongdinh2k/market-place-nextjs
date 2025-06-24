"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define validation schema for basic client-side validation
interface LoginFormData {
  name: string;
  emailOrPhone: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      name: "",
      emailOrPhone: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Here you would typically call a server action or API
      console.log("Form submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle successful login
      // Redirect or show success message
    } catch (error) {
      // Log the error and set a generic error message
      console.error("Login error:", error);
      setError("root", {
        message: "Failed to login. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-[370px]">
      {/* Form Header */}
      <div className="mb-12">
        <h1 className="font-inter text-[36px] text-black font-medium leading-[30px] tracking-[0.04em] mb-6">
          Log in to Exclusive
        </h1>
        <p className="font-poppins text-black text-base">
          Enter your details below
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Name Field */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            className={`w-full bg-transparent border-b border-black/50 pb-2 font-poppins text-base placeholder:text-black/40 focus:outline-none ${
              errors.name ? "border-red-500" : "text-black"
            }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email/Phone Field */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Email or Phone Number"
            className={`w-full bg-transparent border-b border-black/50 pb-2 font-poppins text-base placeholder:text-black/40 focus:outline-none ${
              errors.emailOrPhone ? "border-red-500" : "text-black"
            }`}
            {...register("emailOrPhone", {
              required: "Email or phone number is required",
            })}
          />
          {errors.emailOrPhone && (
            <p className="text-sm text-red-500">
              {errors.emailOrPhone.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <input
            type="password"
            placeholder="Password"
            className={`w-full bg-transparent border-b border-black/50 pb-2 font-poppins text-base placeholder:text-black/40 focus:outline-none ${
              errors.password ? "border-red-500" : "text-black"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Root Error */}
        {errors.root && (
          <p className="text-sm text-red-500">{errors.root.message}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#DB4444] hover:bg-[#c13e3e] text-white font-poppins font-medium py-4"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>

        {/* Login Link */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="font-poppins text-base text-black/70">
            Don&apos;t have an account?
          </span>
          <div className="flex flex-col items-center">
            <Link
              href="/sign-up"
              className="font-poppins font-medium text-base text-black/70 hover:text-black"
            >
              Sign up
            </Link>
            <div className="h-[1px] w-full bg-black/50" />
          </div>
        </div>
      </form>
    </div>
  );
}
