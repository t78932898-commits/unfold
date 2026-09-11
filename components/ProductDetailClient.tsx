"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Check,
  Truck,
  RotateCcw,
  Shield,
  Ruler,
  ChevronRight,
  Info,
} from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Button } from "./Button";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addItem, isInWishlist, toggleWishlist } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.variants[0]?.size || "M"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants[0]?.color || "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const isFavorite = isInWishlist(product.id);

  // Available sizes & colors from variants
  const availableSizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const availableColors = Array.from(new Set(product.variants.map((v) => v.color)));

  // Selected variant
  const currentVariant: ProductVariant | undefined = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  ) || product.variants[0];

  const inStock = currentVariant ? currentVariant.stock > 0 : false;
  const stockCount = currentVariant ? currentVariant.stock : 0;

  const handleAddToCart = () => {
    if (!currentVariant || !inStock) return;

    addItem({
      variantId: currentVariant.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0]?.url || "/images/products/street-01.svg",
      },
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Top Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          HOME
        </Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-zinc-300 transition-colors">
          SHOP
        </Link>
        <ChevronRight size={12} />
        {product.category && (
          <>
            <Link
              href={`/category/${product.category.slug}`}
              className="hover:text-zinc-300 transition-colors"
            >
              {product.category.name}
            </Link>
            <ChevronRight size={12} />
          </>
        )}
        <span className="text-zinc-200 font-bold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:w-24 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-[4/5] w-20 md:w-full bg-zinc-900 rounded border overflow-hidden transition-all ${
                    selectedImageIndex === idx
                      ? "border-white ring-1 ring-white"
                      : "border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText || product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Image Frame */}
          <div className="relative flex-1 aspect-[4/5] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImageIndex]?.url || "/images/products/street-01.svg"}
              alt={product.images[selectedImageIndex]?.altText || product.name}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Badges on main image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.badge && (
                <span className="bg-accent-volt text-black text-[11px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              {product.fit && (
                <span className="bg-black/70 backdrop-blur-sm border border-zinc-800 text-zinc-300 text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                  {product.fit}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              <span>{product.collection || "UNFOLD PERSPECTIVE ARCHIVE"}</span>
              {currentVariant?.sku && (
                <span>SKU: {currentVariant.sku}</span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                INCL. OF ALL TAXES &bull; FREE SHIPPING OVER ₹999
              </span>
            </div>
          </div>

          {/* Short Description */}
          {product.description && (
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed pt-2 border-t border-zinc-800">
              {product.description}
            </p>
          )}

          {/* Color Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase">COLOR:</span>
              <span className="text-white font-bold uppercase">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider border transition-all ${
                    selectedColor === color
                      ? "border-white bg-white text-black font-bold"
                      : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector + Size Guide Trigger */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase">SELECT SIZE (BOXY FIT):</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-zinc-400 hover:text-accent-volt flex items-center gap-1 transition-colors"
              >
                <Ruler size={13} />
                <span className="underline underline-offset-2">SIZE GUIDE</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {availableSizes.map((size) => {
                const variantForSize = product.variants.find(
                  (v) => v.size === size && v.color === selectedColor
                );
                const isAvailable = variantForSize ? variantForSize.stock > 0 : false;

                return (
                  <button
                    key={size}
                    disabled={!isAvailable}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded text-xs font-mono font-bold uppercase border transition-all ${
                      selectedSize === size
                        ? "border-accent-volt bg-accent-volt text-black"
                        : isAvailable
                        ? "border-zinc-800 bg-zinc-900 text-zinc-200 hover:border-zinc-600"
                        : "border-zinc-900 bg-zinc-950 text-zinc-600 cursor-not-allowed line-through"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock Notification */}
          <div className="text-xs font-mono">
            {inStock ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>IN STOCK ({stockCount} UNITS AVAILABLE)</span>
              </span>
            ) : (
              <span className="text-red-400">CURRENTLY OUT OF STOCK</span>
            )}
          </div>

          {/* Quantity & Add to Bag Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
            {/* Quantity Counter */}
            <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded h-13 px-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-zinc-400 hover:text-white px-2 text-base font-mono"
              >
                -
              </button>
              <span className="text-xs font-mono font-bold px-3">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(stockCount || 10, quantity + 1))}
                className="text-zinc-400 hover:text-white px-2 text-base font-mono"
              >
                +
              </button>
            </div>

            {/* Add To Bag CTA */}
            <Button
              size="lg"
              className="flex-1 h-13 gap-2"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check size={18} className="text-emerald-500" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>ADD TO BAG</span>
                </>
              )}
            </Button>

            {/* Wishlist Toggle */}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className={`h-13 w-13 rounded border flex items-center justify-center transition-all ${
                isFavorite
                  ? "border-red-500 bg-red-500/10 text-red-500"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-600"
              }`}
            >
              <Heart
                size={20}
                className={isFavorite ? "fill-current text-red-500" : ""}
              />
            </button>
          </div>

          {/* Garment Details & Assurance Accordion */}
          <div className="border-t border-zinc-800 pt-6 space-y-4 text-xs font-mono text-zinc-400">
            <div className="flex items-start gap-3">
              <Shield size={16} className="text-accent-volt shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block">240 GSM SUPER COMBED COTTON</span>
                <span>Heavyweight luxury cotton fabric with zero shrinkage bio-wash.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck size={16} className="text-accent-volt shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block">FAST PAN-INDIA EXPRESS DELIVERY</span>
                <span>Dispatched within 24-48 hours. Estimated delivery 3-5 business days.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RotateCcw size={16} className="text-accent-volt shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block">7-DAY HASSLE-FREE RETURNS</span>
                <span>Easy exchange or refund if the fit doesn&apos;t meet your expectations.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
              YOU MAY ALSO LIKE
            </h2>
            <Link
              href="/shop"
              className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white"
            >
              VIEW ALL &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <div key={p.id}>
                <Link
                  href={`/product/${p.slug}`}
                  className="block group bg-zinc-950 border border-zinc-900 rounded overflow-hidden hover:border-zinc-700 transition-colors"
                >
                  <div className="relative aspect-[4/5] bg-zinc-900">
                    <Image
                      src={p.images[0]?.url || "/images/products/street-01.svg"}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-bold uppercase text-white truncate">
                      {p.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">
                      {formatCurrency(p.price)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsSizeGuideOpen(false)}
          />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-lg max-w-lg w-full p-6 z-10 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <h3 className="text-base font-bold uppercase tracking-widest text-white">
                UNFOLD 240 GSM OVERSIZED SIZE CHART
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs font-mono text-zinc-400">
              Our tees are engineered with a relaxed drop-shoulder boxy fit. For a standard fit, order one size down.
            </p>

            <table className="w-full text-xs font-mono text-left border border-zinc-800">
              <thead className="bg-zinc-900 text-zinc-300">
                <tr>
                  <th className="p-2.5 border-b border-zinc-800">SIZE</th>
                  <th className="p-2.5 border-b border-zinc-800">CHEST (IN)</th>
                  <th className="p-2.5 border-b border-zinc-800">LENGTH (IN)</th>
                  <th className="p-2.5 border-b border-zinc-800">SHOULDER (IN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-400">
                <tr>
                  <td className="p-2.5 font-bold text-white">S</td>
                  <td className="p-2.5">42</td>
                  <td className="p-2.5">28</td>
                  <td className="p-2.5">20.5</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">M</td>
                  <td className="p-2.5">44</td>
                  <td className="p-2.5">29</td>
                  <td className="p-2.5">21.5</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">L</td>
                  <td className="p-2.5">46</td>
                  <td className="p-2.5">30</td>
                  <td className="p-2.5">22.5</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">XL</td>
                  <td className="p-2.5">48</td>
                  <td className="p-2.5">31</td>
                  <td className="p-2.5">23.5</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">XXL</td>
                  <td className="p-2.5">50</td>
                  <td className="p-2.5">32</td>
                  <td className="p-2.5">24.5</td>
                </tr>
              </tbody>
            </table>

            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => setIsSizeGuideOpen(false)}
            >
              GOT IT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
