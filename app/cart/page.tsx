"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const shippingCost = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - appliedDiscount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "UNFOLD10") {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setPromoMessage("10% PERSPECTIVE DISCOUNT APPLIED");
    } else {
      setPromoMessage("INVALID PROMO CODE. TRY 'UNFOLD10'");
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <Container size="narrow">
          <ShoppingBag size={56} className="mx-auto text-zinc-700 mb-6 stroke-1" />
          <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-3">
            YOUR BAG IS CURRENTLY EMPTY
          </h1>
          <p className="text-sm font-mono text-zinc-400 mb-8 max-w-md mx-auto">
            You haven’t added any perspective drops to your bag yet. Explore our curated categories and claim your oversized statement piece.
          </p>
          <Link href="/shop">
            <Button size="lg" className="px-8">
              EXPLORE ALL TEES &rarr;
            </Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 pb-24">
      <Container>
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            SHOPPING BAG ({totalItems})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Items List */}
          <div className="lg:col-span-8 divide-y divide-zinc-800 border-t border-b border-zinc-800">
            {items.map((item) => (
              <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-28 h-36 bg-zinc-900 border border-zinc-800 rounded overflow-hidden shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between w-full h-36">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-sm sm:text-base font-bold uppercase tracking-tight text-white hover:text-zinc-300 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="text-xs font-mono text-zinc-400 mt-2 space-x-3">
                      <span>SIZE: <strong className="text-zinc-200">{item.size}</strong></span>
                      <span>&bull;</span>
                      <span>COLOR: <strong className="text-zinc-200">{item.color}</strong></span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-zinc-400 hover:text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-mono px-3 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-zinc-400 hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Line Price */}
                    <div className="text-right">
                      <span className="text-base font-mono font-bold text-white">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-lg space-y-6">
              <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-white border-b border-zinc-800 pb-4">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-bold">{formatCurrency(subtotal)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-accent-volt">
                    <span>PROMO CODE DISCOUNT</span>
                    <span>-{formatCurrency(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>ESTIMATED SHIPPING</span>
                  <span className="text-white font-bold">
                    {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
                  </span>
                </div>

                <div className="border-t border-zinc-800 pt-4 flex justify-between text-sm font-bold text-white">
                  <span>TOTAL DUE</span>
                  <span className="text-lg font-mono text-white">
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <label className="text-[11px] font-mono text-zinc-400 block mb-1 uppercase">
                  HAVE A PROMO CODE? (TRY &apos;UNFOLD10&apos;)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="ENTER CODE"
                    className="bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded flex-1 focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-3.5 py-2 text-xs font-mono uppercase rounded transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {promoMessage && (
                  <p className="text-[10px] font-mono mt-1.5 text-accent-volt">
                    {promoMessage}
                  </p>
                )}
              </form>

              {/* Proceed to Checkout Button */}
              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full flex items-center justify-center gap-2">
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                <ShieldCheck size={14} className="text-accent-volt" />
                <span>256-BIT SSL ENCRYPTED CHECKOUT</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
