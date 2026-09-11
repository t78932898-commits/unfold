"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plus, Check } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { isInWishlist, toggleWishlist, addItem } = useCart();

  const isFavorite = isInWishlist(product.id);

  // Images: primary and hover secondary image if present
  const primaryImage = product.images?.[0]?.url || "/images/products/street-01.svg";
  const hoverImage = product.images?.[1]?.url || primaryImage;

  // Extract distinct colors from variants
  const distinctColors = Array.from(
    new Set(product.variants?.map((v) => v.color) || ["Standard"])
  );

  // Quick Add default variant (first available variant or size M/L)
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedVariant =
      product.variants.find((v) => v.stock > 0) || product.variants[0];

    if (!selectedVariant) return;

    addItem({
      variantId: selectedVariant.id,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity: 1,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: primaryImage,
      },
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group relative flex flex-col bg-zinc-950 border border-zinc-900 rounded overflow-hidden transition-all duration-300 hover:border-zinc-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] bg-zinc-900 overflow-hidden"
      >
        {/* Primary Image */}
        <Image
          src={isHovered && product.images.length > 1 ? hoverImage : primaryImage}
          alt={product.name}
          fill
          className="object-cover object-center transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded uppercase ${
                product.badge === "NEW"
                  ? "bg-accent-volt text-black"
                  : product.badge === "BEST SELLER"
                  ? "bg-white text-black"
                  : product.badge === "LIMITED"
                  ? "bg-accent-flame text-white"
                  : "bg-zinc-800 text-zinc-200"
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.fit && (
            <span className="text-[9px] font-mono text-zinc-300 bg-black/70 backdrop-blur-sm border border-zinc-800 px-1.5 py-0.5 rounded uppercase">
              {product.fit}
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-black/60 text-white hover:bg-black/90 hover:scale-110"
          }`}
        >
          <Heart
            size={16}
            className={isFavorite ? "fill-current text-white" : "text-zinc-300"}
          />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className="w-full py-2.5 bg-white text-black text-xs font-mono font-bold uppercase tracking-wider rounded shadow-xl flex items-center justify-center gap-1.5 hover:bg-zinc-200 active:scale-95 transition-all"
          >
            {isAdded ? (
              <>
                <Check size={14} className="text-emerald-600" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>QUICK ADD ({product.variants?.[0]?.size || "M"})</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-zinc-950">
        <div>
          {/* Category breadcrumb / collection */}
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1 flex items-center justify-between">
            <span>{product.collection || "UNFOLD ARCHIVE"}</span>
          </div>

          {/* Product Name */}
          <Link
            href={`/product/${product.slug}`}
            className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-100 hover:text-white line-clamp-2 transition-colors mb-2 font-sans"
          >
            {product.name}
          </Link>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-mono font-bold text-white tracking-tight">
              {formatCurrency(product.price)}
            </span>

            {/* Available Colors Indicator */}
            <div className="flex items-center gap-1.5" title={distinctColors.join(", ")}>
              <span className="text-[10px] font-mono text-zinc-500">
                {distinctColors.length} {distinctColors.length === 1 ? "COLOR" : "COLORS"}
              </span>
            </div>
          </div>

          {/* Color Chips */}
          <div className="flex items-center gap-1 mt-2">
            {distinctColors.map((color) => (
              <span
                key={color}
                className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
