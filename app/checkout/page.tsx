"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingCost = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="py-24">
        <Container size="narrow" className="text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
            ✓
          </div>
          <span className="text-xs font-mono text-accent-volt uppercase tracking-widest block">
            ORDER CONFIRMATION FOUNDATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-white font-sans">
            PERSPECTIVE ORDER RECEIVED
          </h1>
          <p className="text-sm font-mono text-zinc-400 max-w-md mx-auto">
            Order test reference: <strong>#UNFOLD-{Math.floor(100000 + Math.random() * 900000)}</strong>. A confirmation email will be dispatched once payment provider is connected.
          </p>
          <div className="pt-6">
            <Link href="/shop">
              <Button size="md">CONTINUE SHOPPING</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 pb-24">
      <Container>
        <div className="border-b border-zinc-800 pb-6 mb-8 flex items-center justify-between">
          <div>
            <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase mb-2">
              <Link href="/cart" className="hover:text-white flex items-center gap-1">
                <ArrowLeft size={12} />
                <span>RETURN TO BAG</span>
              </Link>
              <ChevronRight size={12} />
              <span className="text-white font-bold">CHECKOUT</span>
            </nav>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
              SHIPPING &amp; CHECKOUT
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded">
            <ShieldCheck size={16} />
            <span>ENCRYPTED CHECKOUT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-lg space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
                  1. CONTACT DETAILS
                </h2>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                  />
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                    Order tracking and invoice will be sent here.
                  </span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-lg space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
                  2. DELIVERY ADDRESS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Receiver Name"
                      className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      CONTACT PHONE *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    STREET ADDRESS / FLAT / LOCALITY *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Apt No., Building, Street Name"
                    className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      CITY *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Mumbai / Delhi"
                      className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      STATE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Maharashtra"
                      className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      PIN CODE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="400001"
                      className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section Placeholder Notice */}
              <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-lg space-y-3">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
                  3. PAYMENT GATEWAY (MILESTONE 2)
                </h2>
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded text-xs font-mono text-zinc-400 space-y-1">
                  <p className="text-white font-semibold">
                    Razorpay / Stripe Gateway Integration Hook
                  </p>
                  <p>
                    Per project roadmap, payment processing will be connected with live credentials in Milestone 2. You can test form validation and order submission now.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                isLoading={isProcessing}
                className="w-full tracking-widest"
              >
                TEST SUBMIT ORDER ({formatCurrency(grandTotal)})
              </Button>
            </form>
          </div>

          {/* Order Summary Right Rail */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-lg space-y-6 sticky top-28">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-zinc-800 pb-3">
                ORDER REVIEW ({items.length} ITEMS)
              </h2>

              <div className="max-h-64 overflow-y-auto divide-y divide-zinc-900 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-xs font-mono">
                    <div>
                      <p className="text-white font-bold uppercase line-clamp-1">{item.product.name}</p>
                      <p className="text-zinc-500">
                        {item.size} &bull; {item.color} &times; {item.quantity}
                      </p>
                    </div>
                    <span className="text-white font-bold">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>SUBTOTAL</span>
                  <span className="text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>SHIPPING</span>
                  <span className="text-white">
                    {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between text-sm font-bold text-white">
                  <span>TOTAL AMOUNT</span>
                  <span className="font-mono text-accent-volt text-base">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
