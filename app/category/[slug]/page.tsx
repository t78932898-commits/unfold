import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { getCategoryBySlug, getProducts, getCategories } from "@/lib/data";
import { Container } from "@/components/Container";
import { ProductGrid } from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    sort?: string;
    fit?: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return { title: "Category Not Found — UNFOLD" };
  }
  return {
    title: `${category.name.toUpperCase()} — UNFOLD Streetwear`,
    description: category.description || "Discover graphic T-shirts from UNFOLD.",
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  // Retrieve products for this category from database layer
  const products = await getProducts({
    categorySlug: params.slug,
    sort: searchParams?.sort,
  });

  return (
    <div className="py-8 sm:py-12 pb-20">
      <Container>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 uppercase">
          <Link href="/" className="hover:text-zinc-300 transition-colors">
            HOME
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-zinc-300 transition-colors">
            SHOP
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-200 font-bold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="border-b border-zinc-800 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono tracking-widest text-accent-volt uppercase block mb-2">
                PERSPECTIVE ARCHIVE
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans">
                {category.name}
              </h1>
              {category.description && (
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>

            <div className="font-mono text-xs text-zinc-500 uppercase shrink-0">
              SHOWING {products.length} {products.length === 1 ? "DESIGN" : "DESIGNS"}
            </div>
          </div>

          {/* Quick Filters / Sorting Bar */}
          <div className="mt-8 pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <SlidersHorizontal size={14} />
              <span>SORT:</span>
              <Link
                href={`/category/${params.slug}?sort=newest`}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  !searchParams?.sort || searchParams.sort === "newest"
                    ? "bg-white text-black font-bold"
                    : "hover:text-white"
                }`}
              >
                NEWEST
              </Link>
              <Link
                href={`/category/${params.slug}?sort=price-asc`}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  searchParams?.sort === "price-asc"
                    ? "bg-white text-black font-bold"
                    : "hover:text-white"
                }`}
              >
                PRICE: LOW-HIGH
              </Link>
              <Link
                href={`/category/${params.slug}?sort=price-desc`}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  searchParams?.sort === "price-desc"
                    ? "bg-white text-black font-bold"
                    : "hover:text-white"
                }`}
              >
                PRICE: HIGH-LOW
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Product Grid */}
        <ProductGrid
          products={products}
          columns={4}
          emptyMessage={`No active graphic tees in ${category.name} yet.`}
        />
      </Container>
    </div>
  );
}
