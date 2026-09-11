import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const numberTag = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative block aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded bg-zinc-900 border border-zinc-800 transition-all duration-300 hover:border-zinc-500"
    >
      {/* Background Graphic Asset */}
      {category.image && (
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      )}

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/30 group-hover:from-zinc-950/90 transition-colors" />

      {/* Top Details */}
      <div className="absolute top-4 inset-x-4 flex justify-between items-start z-10">
        <span className="font-mono text-xs font-bold text-zinc-400 border border-zinc-800 bg-zinc-950/80 px-2 py-1 rounded backdrop-blur-sm">
          {numberTag}
        </span>
        <div className="w-8 h-8 rounded-full bg-zinc-950/80 border border-zinc-700 flex items-center justify-center text-white transition-transform duration-300 group-hover:bg-white group-hover:text-black group-hover:rotate-45">
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col justify-end">
        <span className="text-[10px] font-mono tracking-widest text-accent-volt uppercase mb-1">
          PERSPECTIVE WORLD
        </span>
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-sans group-hover:text-accent-volt transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed font-sans">
            {category.description}
          </p>
        )}
        <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span>{category.productCount ? `${category.productCount} DESIGNS` : "EXPLORE WORLD"}</span>
          <span className="text-white group-hover:translate-x-1 transition-transform">
            VIEW &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
