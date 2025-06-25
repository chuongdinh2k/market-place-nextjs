"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Sign Up", path: "/sign-up" },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-x-[190px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-inter font-bold text-[24px] leading-none tracking-[0.03em] text-black">
              Exclusive
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-[48px]">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link href={item.path} passHref>
                      <NavigationMenuLink
                        className={`relative px-0 py-0 text-[16px] font-poppins text-black hover:text-primary transition-colors flex flex-col items-center ${
                          isActive(item.path) ? "font-medium" : ""
                        }`}
                      >
                        {item.name}
                        {isActive(item.path) && (
                          <div className="w-12 h-[1px] bg-black mt-1" />
                        )}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Search and Icons */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-[#F5F5F5] rounded px-5 py-[7px]">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-transparent border-none outline-none text-sm text-black placeholder:text-black/50 w-[200px]"
            />
            <button type="submit" className="ml-[34px]">
              <Image
                src="/icons/search-icon.svg"
                alt="Search"
                width={16}
                height={16}
              />
            </button>
          </div>

          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            className="hidden md:flex items-center justify-center w-8 h-8"
          >
            <Image
              src="/icons/wishlist-icon.svg"
              alt="Wishlist"
              width={20}
              height={18}
            />
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="hidden md:flex items-center justify-center w-8 h-8 relative"
          >
            <div className="relative">
              <Image
                src="/icons/cart-icon.svg"
                alt="Cart"
                width={23}
                height={17}
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-inter font-bold text-[24px] leading-none tracking-[0.03em] text-black">
                      Exclusive
                    </span>
                  </Link>

                  <div className="flex items-center bg-[#F5F5F5] rounded px-5 py-[7px] w-full">
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="bg-transparent border-none outline-none text-sm text-black placeholder:text-black/50 w-full"
                    />
                    <button type="submit">
                      <Image
                        src="/icons/search-icon.svg"
                        alt="Search"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`text-[16px] font-poppins ${
                          isActive(item.path) ? "font-medium" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="flex gap-6 mt-4">
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src="/icons/wishlist-icon.svg"
                        alt="Wishlist"
                        width={20}
                        height={18}
                      />
                      <span className="text-[16px] font-poppins">Wishlist</span>
                    </Link>

                    <Link
                      href="/cart"
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src="/icons/cart-icon.svg"
                        alt="Cart"
                        width={23}
                        height={17}
                      />
                      <span className="text-[16px] font-poppins">Cart</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
