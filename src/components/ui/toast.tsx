"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
}

const variantStyles = {
  default: "bg-white text-black border border-gray-200",
  success: "bg-green-50 text-green-900 border border-green-200",
  error: "bg-red-50 text-red-900 border border-red-200",
  warning: "bg-yellow-50 text-yellow-900 border border-yellow-200",
};

export function Toast({
  open,
  onOpenChange,
  title,
  description,
  variant = "default",
  duration = 4000,
}: ToastProps) {
  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
      className={cn(
        "rounded-lg shadow-lg px-4 py-3 w-full max-w-xs sm:max-w-sm flex flex-col gap-1 border",
        variantStyles[variant]
      )}
    >
      <ToastPrimitive.Title className="font-semibold text-base">
        {title}
      </ToastPrimitive.Title>
      {description && (
        <ToastPrimitive.Description className="text-sm opacity-80">
          {description}
        </ToastPrimitive.Description>
      )}
    </ToastPrimitive.Root>
  );
}
