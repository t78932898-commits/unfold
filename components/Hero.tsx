import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./Button";

export function Hero() {
  return (
    <section className="relative w-full min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-zinc-800 bg-zinc-950">
      {/* Background Graphic Asset */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.svg"
          alt="UNFOLD Editorial Streetwear Campaign"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/70" />
      </div>

      {/* Streetwear Coordinate Watermark */}
      <div className="absolute top-8 left-8 hidden md:block z-10">
        <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase space-y-1">
          <p>SYS // 28.6139° N, 77.2090° E</p>
          <p>SEASON 01 // PERSPECTIVE MATRIX</p>
        </div>
      </div>

      <div className="absolute top-8 right-8 hidden md:block z-10">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-accent-volt uppercase border border-accent-volt/30 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
          <Sparkles size={12} />
          <span>DROP 01 LIVE</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
          <span className="text-[11px] font-mono font-semibold tracking-widest text-zinc-300 uppercase">
            GRAPHIC PRINTED OVERSIZED TEES
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white font-sans uppercase leading-none mb-6">
          UNFOLD
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-zinc-300 mb-10 max-w-2xl mx-auto font-sans">
          Wear Your Perspective.
        </p>

        <p className="text-xs sm:text-sm font-normal text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed font-mono">
          Engineered on 240 GSM heavy combed cotton. Four visual worlds celebrating self-expression, raw skate culture, surreal art, and unapologetic statements.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shop">
            <Button size="lg" className="w-full sm:w-auto px-8 group">
              <span className="tracking-widest">SHOP COLLECTION</span>
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </Link>
          <Link href="/shop?badge=NEW">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
              <span className="tracking-widest">EXPLORE NEW DROPS</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Ticker/Bar */}
      <div className="absolute bottom-0 inset-x-0 border-t border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md py-2.5 px-6 hidden sm:flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
        <span>240 GSM HEAVYWEIGHT COTTON</span>
        <span>•</span>
        <span>MUSEUM-GRADE SCREEN &amp; DTG PRINT</span>
        <span>•</span>
        <span>PAN-INDIA EXPRESS DISPATCH</span>
        <span>•</span>
        <span>NO RESTOCKS GUARANTEED</span>
      </div>
    </section>
  );
}
