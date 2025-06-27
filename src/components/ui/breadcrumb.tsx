"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  href: string;
  label: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      separator = <ChevronRight className="h-4 w-4 text-gray-400" />,
      showHomeIcon = true,
      variant = "default",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "",
      outline: "p-1 rounded-md border border-gray-200",
      ghost: "p-1 rounded-md hover:bg-gray-50",
    };

    const sizeStyles = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return (
      <NavigationMenuPrimitive.Root asChild>
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(
            "flex items-center",
            sizeStyles[size],
            variantStyles[variant],
            className
          )}
          {...props}
        >
          <NavigationMenuPrimitive.List className="flex items-center space-x-2">
            {showHomeIcon && (
              <NavigationMenuPrimitive.Item>
                <NavigationMenuPrimitive.Link asChild>
                  <Link
                    href="/"
                    className="flex items-center text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Home"
                  >
                    <Home
                      className={cn(
                        "h-4 w-4",
                        size === "lg"
                          ? "h-5 w-5"
                          : size === "sm"
                          ? "h-3 w-3"
                          : ""
                      )}
                    />
                  </Link>
                </NavigationMenuPrimitive.Link>
              </NavigationMenuPrimitive.Item>
            )}

            {showHomeIcon && items.length > 0 && (
              <li className="flex items-center">
                <span className="mx-1">{separator}</span>
              </li>
            )}

            {items.map((item, index) => (
              <React.Fragment key={item.href}>
                <NavigationMenuPrimitive.Item>
                  {item.isCurrent ? (
                    <span
                      className="font-medium text-gray-900"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <NavigationMenuPrimitive.Link asChild>
                      <Link
                        href={item.href}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuPrimitive.Link>
                  )}
                </NavigationMenuPrimitive.Item>

                {index < items.length - 1 && (
                  <li className="flex items-center">
                    <span className="mx-1">{separator}</span>
                  </li>
                )}
              </React.Fragment>
            ))}
          </NavigationMenuPrimitive.List>
        </nav>
      </NavigationMenuPrimitive.Root>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
