"use client";

import * as React from "react";
import {
  ToastProvider as RadixToastProvider,
  ToastViewport,
} from "@radix-ui/react-toast";
import { Toast } from "@/components/ui/toast";

type ToastOptions = {
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
};

type ToastContextType = {
  notify: (options: ToastOptions) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<
    Array<ToastOptions & { id: string; open: boolean }>
  >([]);

  const notify = React.useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...options, id, open: true }]);
  }, []);

  const handleOpenChange = (id: string, open: boolean) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, open } : toast))
    );
    if (!open) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 300);
    }
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      <RadixToastProvider swipeDirection="right">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            open={toast.open}
            onOpenChange={(open) => handleOpenChange(toast.id, open)}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            duration={toast.duration}
          />
        ))}
        <ToastViewport className="fixed z-50 bottom-4 right-4 flex flex-col gap-2 w-full max-w-xs sm:max-w-sm" />
        {children}
      </RadixToastProvider>
    </ToastContext.Provider>
  );
}
