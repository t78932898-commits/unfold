import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { Container } from "@/components/Container";
import { ProductGrid } from "@/components/ProductGrid";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "SHOP ALL — UNFOLD Graphic Printed T-Shirts",
  description:
    "Explore the complete UNFOLD streetwear catalogue. Oversized 240 GSM tees across Street, Art, Statement, and Vintage categories.",
};

interface ShopPageProps {
  searchParams?: {
    category?: string;
    sort?: string;
    search?: string;
    badge?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: searchParams?.category,
      sort: searchParams?.sort,
      search: searchParams?.search,
      badge: searchParams?.badge,
    }),
  ]);

  const activeCategorySlug = searchParams?.category;
  const currentSearch = searchParams?.search || "";
  const currentBadge = searchParams?.badge;

  return (
    <div className="py-8 sm:py-12 pb-20">
      <Container>
        {/* Shop Header */}
        <div className="border-b border-zinc-800 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-accent-volt uppercase block mb-2">
                COMPLETE ARCHIVE
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans">
                SHOP ALL TEES
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans">
                240 GSM Heavy Combed Cotton &bull; Engineered Oversized Fit
              </p>
            </div>

            <div className="font-mono text-xs text-zinc-500 uppercase">
              SHOWING {products.length} {products.length === 1 ? "STYLE" : "STYLES"}
            </div>
          </div>

          {/* Search and Category Filters */}
          <div className="mt-8 space-y-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/shop"
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  !activeCategorySlug && !currentBadge
                    ? "bg-white text-black font-bold"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                }`}
              >
                ALL WORLDS
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeCategorySlug === cat.slug
                      ? "bg-white text-black font-bold"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}

              <Link
                href="/shop?badge=NEW"
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  currentBadge === "NEW"
                    ? "bg-accent-volt text-black font-bold"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                }`}
              >
                NEW DROPS
              </Link>
            </div>

            {/* Search and Sort Sub-Bar */}
            <div className="pt-3 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4">
              {/* Active Search indicator */}
              {currentSearch && (
                <div className="flex items-center gap-2 text-xs font-mono bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
                  <span className="text-zinc-500">QUERY:</span>
                  <span className="text-white">&quot;{currentSearch}&quot;</span>
                  <Link href="/shop" className="text-zinc-500 hover:text-white ml-1">
                    <X size={12} />
                  </Link>
                </div>
              )}

              {/* Sort links */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 ml-auto">
                <SlidersHorizontal size={14} />
                <span>SORT:</span>
                <Link
                  href={`/shop?${new URLSearchParams({
                    ...(activeCategorySlug ? { category: activeCategorySlug } : {}),
                    sort: "newest",
                  }).toString()}`}
                  className={`px-2 py-0.5 rounded text-xs ${
                    !searchParams?.sort || searchParams.sort === "newest"
                      ? "text-white font-bold"
                      : "hover:text-white"
                  }`}
                >
                  NEWEST
                </Link>
                <Link
                  href={`/shop?${new URLSearchParams({
                    ...(activeCategorySlug ? { category: activeCategorySlug } : {}),
                    sort: "price-asc",
                  }).toString()}`}
                  className={`px-2 py-0.5 rounded text-xs ${
                    searchParams?.sort === "price-asc"
                      ? "text-white font-bold"
                      : "hover:text-white"
                  }`}
                >
                  PRICE: LOW-HIGH
                </Link>
                <Link
                  href={`/shop?${new URLSearchParams({
                    ...(activeCategorySlug ? { category: activeCategorySlug } : {}),
                    sort: "price-desc",
                  }).toString()}`}
                  className={`px-2 py-0.5 rounded text-xs ${
                    searchParams?.sort === "price-desc"
                      ? "text-white font-bold"
                      : "hover:text-white"
                  }`}
                >
                  PRICE: HIGH-LOW
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          columns={4}
          emptyMessage="No graphic tees matched your current filters. Try resetting your search."
        />
      </Container>
    </div>
  );
}
