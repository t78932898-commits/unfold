"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Button } from "./Button";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-zinc-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest">
                YOUR BAG ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-zinc-800">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag size={48} className="text-zinc-700 mb-4 stroke-1" />
                <h3 className="text-base font-semibold mb-2 uppercase tracking-wider">
                  Your bag is empty
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs mb-6">
                  Explore our latest perspective drops and discover your personal statement piece.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsCartDrawerOpen(false)}
                >
                  <Link href="/shop">EXPLORE DROPS</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div className="relative w-20 h-24 bg-zinc-900 border border-zinc-800 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="text-xs font-semibold uppercase tracking-wider hover:text-zinc-300 line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-1 space-x-2">
                        <span>SIZE: {item.size}</span>
                        <span>&bull;</span>
                        <span>COLOR: {item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-mono px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-xs font-bold font-mono">
                        {formatCurrency(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>SUBTOTAL</span>
                  <span className="font-mono text-zinc-200">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>SHIPPING</span>
                  <span className="font-mono text-zinc-200">
                    {subtotal >= 999 ? "FREE" : formatCurrency(99)}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-sm">
                  <span>TOTAL</span>
                  <span className="font-mono text-white">
                    {formatCurrency(subtotal + (subtotal >= 999 ? 0 : 99))}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    VIEW BAG
                  </Button>
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full"
                >
                  <Button size="sm" className="w-full flex items-center gap-1">
                    <span>CHECKOUT</span>
                    <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
