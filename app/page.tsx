import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Flame } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductGrid } from "@/components/ProductGrid";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { StreetUrbanSection } from "@/components/StreetUrbanSection";
import { getCategories, getProducts } from "@/lib/data";

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function HomePage() {
  // Fetch categories and curated products from database layer
  const [categories, newArrivals, bestSellers] = await Promise.all([
    getCategories(),
    getProducts({ badge: "NEW" }),
    getProducts({ badge: "BEST SELLER" }),
  ]);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. FOUR BRAND CATEGORIES */}
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-accent-volt uppercase mb-2">
              <Layers size={14} />
              <span>THE FOUR WORLDS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
              EXPLORE BY PERSPECTIVE
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 mt-2 md:mt-0 max-w-sm">
            Four distinct design philosophies. Choose the canvas that matches your mindset.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, idx) => (
            <CategoryCard key={category.id} category={category} index={idx} />
          ))}
        </div>
      </Container>

      {/* 3. STREET / URBAN SPOTLIGHT BANNER */}
      <StreetUrbanSection />

      {/* 4. NEW ARRIVALS */}
      <Container>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-accent-volt uppercase mb-2">
              <Sparkles size={14} />
              <span>JUST DROPPED</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            href="/shop?badge=NEW"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
          >
            <span>VIEW ALL NEW</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={newArrivals.slice(0, 4)} />

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop?badge=NEW">
            <Button variant="outline" size="sm" className="w-full">
              VIEW ALL NEW ARRIVALS &rarr;
            </Button>
          </Link>
        </div>
      </Container>

      {/* 4. STATEMENT BANNER / FEATURED HIGHLIGHT */}
      <div className="bg-zinc-900 border-y border-zinc-800 py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4ff00_1px,transparent_1px)] [background-size:20px_20px]" />
        <Container className="relative z-10 text-center max-w-4xl">
          <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-accent-volt border border-accent-volt/40 px-3 py-1 rounded-full mb-6 bg-black/50">
            CRAFT &amp; CONSTRUCTION
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-6 font-sans">
            HEAVYWEIGHT 240 GSM. ZERO COMPROMISE.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-mono max-w-2xl mx-auto leading-relaxed mb-8">
            Every UNFOLD garment is crafted from 100% super combed bio-washed cotton. Ribbed lycra collars that resist stretching. High-density cracked &amp; puff prints designed to survive 100+ washes.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-xs font-mono text-zinc-300 uppercase">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-accent-volt" />
              <span>PRE-SHRUNK BIO-WASH</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-accent-volt" />
              <span>DROP-SHOULDER BOXY FIT</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-accent-volt" />
              <span>LIMITED QUANTITIES</span>
            </div>
          </div>
        </Container>
      </div>

      {/* 5. BEST SELLERS */}
      <Container>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-accent-flame uppercase mb-2">
              <Flame size={14} />
              <span>MOST WANTED</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
              BEST SELLERS
            </h2>
          </div>
          <Link
            href="/shop?badge=BEST+SELLER"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
          >
            <span>VIEW ALL BEST SELLERS</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={bestSellers.slice(0, 4)} />

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop?badge=BEST+SELLER">
            <Button variant="outline" size="sm" className="w-full">
              VIEW ALL BEST SELLERS &rarr;
            </Button>
          </Link>
        </div>
      </Container>

      {/* 6. BRAND STORY */}
      <Container>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-mono tracking-widest text-accent-volt uppercase">
              THE PERSPECTIVE STORY
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
              WHAT YOU WEAR SHOULD SAY SOMETHING REAL.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              UNFOLD was founded on a simple observation: modern fashion had become repetitive, safe, and generic. We created UNFOLD as a graphic canvas for individuals who look at the world through different lenses.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              Whether it’s raw skate calligraphy from the concrete streets, mind-bending surrealist art, unapologetic Gen-Z sarcasm, or nostalgic 90s vintage archives — your clothing should be an extension of your mind.
            </p>
            <div className="pt-2">
              <Link href="/shop">
                <Button size="md" className="gap-2">
                  <span>DISCOVER THE ARCHIVE</span>
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded p-6 sm:p-8 space-y-6 font-mono text-xs">
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">BRAND</span>
              <span className="text-white font-bold">UNFOLD</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">FOUNDATION</span>
              <span className="text-white font-bold">WEAR YOUR PERSPECTIVE</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">GSM GRADE</span>
              <span className="text-white font-bold">240 GSM COMBED COTTON</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-zinc-500">WORLDS</span>
              <span className="text-white font-bold">4 DESIGN CATEGORIES</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">DISPATCH</span>
              <span className="text-accent-volt font-bold">24-48 HOUR EXPRESS</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
