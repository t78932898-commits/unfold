"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Category } from "@/types";

interface NavbarProps {
  categories?: Category[];
}

export function Navbar({ categories = [] }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, wishlist, setIsCartDrawerOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "SHOP", href: "/shop" },
    {
      name: "CATEGORIES",
      href: "/shop",
      hasDropdown: true,
    },
    { name: "NEW ARRIVALS", href: "/shop?badge=NEW" },
    { name: "BEST SELLERS", href: "/shop?badge=BEST+SELLER" },
  ];

  const defaultCategories = [
    { name: "Street / Urban", slug: "street-urban" },
    { name: "Art / Creative", slug: "art-creative" },
    { name: "Statement / Attitude", slug: "statement-attitude" },
    { name: "Vintage / Culture", slug: "vintage-culture" },
  ];

  const activeCategories = categories.length > 0 ? categories : defaultCategories;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-lg py-3"
            : "bg-zinc-950 border-b border-zinc-800 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile: Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open mobile navigation menu"
                className="p-2 text-zinc-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-2">
                <span className="text-2xl font-black tracking-tighter text-white font-sans">
                  UNFOLD
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded uppercase">
                  EST. 2026
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative group"
                      onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                      onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                    >
                      <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white py-2 transition-colors">
                        <span>{link.name}</span>
                        <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                      </button>

                      {/* Dropdown Menu */}
                      {isCategoryDropdownOpen && (
                        <div className="absolute top-full left-0 w-64 bg-zinc-950 border border-zinc-800 shadow-2xl p-2 rounded mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="text-[10px] font-mono uppercase text-zinc-500 px-3 py-1.5 tracking-wider border-b border-zinc-800/80 mb-1">
                            The 4 Worlds
                          </div>
                          {activeCategories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/category/${cat.slug}`}
                              className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-zinc-900 rounded transition-colors"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search store"
                className="p-2 text-zinc-300 hover:text-white transition-colors"
              >
                <Search size={19} />
              </button>

              {/* Wishlist */}
              <Link
                href="/account?tab=wishlist"
                aria-label="Wishlist"
                className="p-2 text-zinc-300 hover:text-white transition-colors relative"
              >
                <Heart size={19} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-accent-volt text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                aria-label="My Account"
                className="p-2 text-zinc-300 hover:text-white transition-colors"
              >
                <User size={19} />
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                aria-label="Shopping Cart"
                className="p-2 text-zinc-300 hover:text-white transition-colors relative flex items-center gap-1.5"
              >
                <ShoppingBag size={19} />
                <span className="hidden sm:inline-block text-xs font-bold font-mono uppercase tracking-wider">
                  BAG
                </span>
                {totalItems > 0 && (
                  <span className="bg-white text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-zinc-800 bg-zinc-950/95 py-3 px-4 animate-in fade-in duration-200">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search size={18} className="absolute left-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="SEARCH GRAPHIC TEES, COLLECTIONS, ARTWORK..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 pl-10 pr-20 py-2.5 text-xs tracking-wider uppercase font-mono rounded focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-3 py-1 bg-white text-black text-xs font-bold uppercase rounded font-mono hover:bg-zinc-200"
                >
                  GO
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="text-xl font-black tracking-tighter text-white">
                  UNFOLD
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="space-y-4">
                <Link
                  href="/shop"
                  className="block text-sm font-bold uppercase tracking-widest text-zinc-200 hover:text-white"
                >
                  SHOP ALL
                </Link>

                <div className="pt-2 pb-2">
                  <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider block mb-2">
                    FOUR WORLDS
                  </span>
                  <div className="space-y-2.5 pl-3 border-l border-zinc-800">
                    {activeCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="block text-xs font-medium uppercase tracking-wider text-zinc-300 hover:text-white"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/shop?badge=NEW"
                  className="block text-sm font-bold uppercase tracking-widest text-zinc-200 hover:text-white"
                >
                  NEW ARRIVALS
                </Link>

                <Link
                  href="/shop?badge=BEST+SELLER"
                  className="block text-sm font-bold uppercase tracking-widest text-zinc-200 hover:text-white"
                >
                  BEST SELLERS
                </Link>

                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <Link
                    href="/account"
                    className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    <User size={16} />
                    <span>MY ACCOUNT / ORDERS</span>
                  </Link>
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-300"
                  >
                    <span>ADMIN PORTAL</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 text-[11px] font-mono text-zinc-500">
              <p>UNFOLD &copy; 2026</p>
              <p>WEAR YOUR PERSPECTIVE.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
