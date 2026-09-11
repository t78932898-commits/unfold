"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { SEED_PRODUCTS } from "@/lib/data";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "profile">("orders");
  const { wishlist, toggleWishlist } = useCart();

  const wishlistProducts = SEED_PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Mock initial order history for preview
  const sampleOrders = [
    {
      id: "ORD-94821",
      date: "2026-09-02",
      total: 2998,
      status: "DELIVERED",
      items: [
        { name: "REBELLION CHRONICLES OVERSIZED TEE", size: "L", qty: 1, price: 1499 },
        { name: "1988 TOKYO MIDNIGHT RACER VINTAGE TEE", size: "L", qty: 1, price: 1499 },
      ],
    },
    {
      id: "ORD-92104",
      date: "2026-08-15",
      total: 1549,
      status: "CONFIRMED",
      items: [
        { name: "CYBER DISSOLUTION DIGITAL ART TEE", size: "XL", qty: 1, price: 1549 },
      ],
    },
  ];

  return (
    <div className="py-12 pb-24">
      <Container>
        {/* Header */}
        <div className="border-b border-zinc-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-accent-volt uppercase block mb-1">
              ACCOUNT DASHBOARD
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
              WELCOME BACK, TANISHA
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              CLIENT ID: #UNF-7729 &bull; ROLE: CUSTOMER &bull; MEMBER SINCE 2026
            </p>
          </div>

          <Link href="/admin">
            <Button variant="outline" size="sm" className="gap-1.5 font-mono text-xs">
              <span>ADMIN DASHBOARD</span>
              <ExternalLink size={12} />
            </Button>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-1">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between p-3.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                activeTab === "orders"
                  ? "bg-zinc-900 text-white font-bold border border-zinc-800"
                  : "text-zinc-400 hover:bg-zinc-950 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package size={16} />
                <span>MY ORDERS</span>
              </div>
              <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded">
                {sampleOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full flex items-center justify-between p-3.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                activeTab === "wishlist"
                  ? "bg-zinc-900 text-white font-bold border border-zinc-800"
                  : "text-zinc-400 hover:bg-zinc-950 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart size={16} />
                <span>SAVED WISHLIST</span>
              </div>
              <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded">
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center justify-between p-3.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                activeTab === "addresses"
                  ? "bg-zinc-900 text-white font-bold border border-zinc-800"
                  : "text-zinc-400 hover:bg-zinc-950 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin size={16} />
                <span>SAVED ADDRESSES</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center justify-between p-3.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                activeTab === "profile"
                  ? "bg-zinc-900 text-white font-bold border border-zinc-800"
                  : "text-zinc-400 hover:bg-zinc-950 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User size={16} />
                <span>PROFILE SETTINGS</span>
              </div>
            </button>

            <div className="pt-4 mt-4 border-t border-zinc-900">
              <Link
                href="/login"
                className="w-full flex items-center gap-2.5 p-3.5 rounded text-xs font-mono text-zinc-500 hover:text-red-400 transition-colors uppercase"
              >
                <LogOut size={16} />
                <span>SIGN OUT</span>
              </Link>
            </div>
          </div>

          {/* Tab Content Panel */}
          <div className="lg:col-span-9 bg-zinc-950 border border-zinc-800 rounded-lg p-6 sm:p-8">
            {/* 1. ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="border-b border-zinc-800 pb-4">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-white">
                    ORDER HISTORY ({sampleOrders.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {sampleOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="border border-zinc-800 bg-zinc-900/40 rounded p-5 space-y-4"
                    >
                      <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-mono border-b border-zinc-800/80 pb-3">
                        <div className="space-x-4">
                          <span className="font-bold text-white">{ord.id}</span>
                          <span className="text-zinc-500">{ord.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="bg-zinc-800 text-emerald-400 px-2 py-0.5 rounded font-bold text-[10px]">
                            {ord.status}
                          </span>
                          <span className="font-bold text-white">
                            {formatCurrency(ord.total)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ord.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-xs font-mono text-zinc-400"
                          >
                            <span>
                              {item.name} (SIZE {item.size}) &times; {item.qty}
                            </span>
                            <span>{formatCurrency(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <div className="border-b border-zinc-800 pb-4 flex justify-between items-center">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-white">
                    SAVED FAVORITES ({wishlist.length})
                  </h2>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="py-16 text-center text-zinc-500 font-mono text-xs">
                    <p>You have not bookmarked any tees yet.</p>
                    <Link href="/shop" className="inline-block mt-4">
                      <Button size="sm">EXPLORE SHOP</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex gap-4 p-3 bg-zinc-900/60 border border-zinc-800 rounded"
                      >
                        <div className="w-20 h-24 bg-zinc-900 rounded overflow-hidden relative shrink-0">
                          <img
                            src={p.images[0]?.url || "/images/products/street-01.svg"}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <Link
                              href={`/product/${p.slug}`}
                              className="text-xs font-bold uppercase text-white hover:text-zinc-300 line-clamp-1"
                            >
                              {p.name}
                            </Link>
                            <p className="text-xs font-mono text-zinc-400 mt-1">
                              {formatCurrency(p.price)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/product/${p.slug}`}>
                              <button className="text-[11px] font-mono text-white underline">
                                VIEW TEE
                              </button>
                            </Link>
                            <button
                              onClick={() => toggleWishlist(p.id)}
                              className="text-[11px] font-mono text-zinc-500 hover:text-red-400"
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="border-b border-zinc-800 pb-4 flex justify-between items-center">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-white">
                    SAVED ADDRESSES
                  </h2>
                  <Button size="sm" variant="outline">
                    + ADD NEW ADDRESS
                  </Button>
                </div>

                <div className="border border-zinc-800 p-5 rounded bg-zinc-900/40 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">PRIMARY RESIDENCE (DEFAULT)</span>
                    <span className="bg-accent-volt text-black text-[10px] font-bold px-2 py-0.5 rounded">
                      DEFAULT
                    </span>
                  </div>
                  <p className="text-zinc-300 font-sans">Tanisha Sharma</p>
                  <p className="text-zinc-400">Flat 402, Skyline Residency, Bandra West</p>
                  <p className="text-zinc-400">Mumbai, Maharashtra 400050</p>
                  <p className="text-zinc-400">Phone: +91 98765 43210</p>
                </div>
              </div>
            )}

            {/* 4. PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="border-b border-zinc-800 pb-4">
                  <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-white">
                    PROFILE &amp; SECURITY
                  </h2>
                </div>

                <form className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      DISPLAY NAME
                    </label>
                    <input
                      type="text"
                      defaultValue="Tanisha Sharma"
                      className="w-full bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-xs font-mono rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      defaultValue="tanisha@example.com"
                      className="w-full bg-zinc-900 border border-zinc-700 text-white px-3 py-2 text-xs font-mono rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      ROLE PERMISSION
                    </label>
                    <input
                      type="text"
                      disabled
                      value="CUSTOMER (ADMIN PRIVILEGED)"
                      className="w-full bg-zinc-950 border border-zinc-800 text-zinc-500 px-3 py-2 text-xs font-mono rounded"
                    />
                  </div>
                  <Button size="sm">SAVE CHANGES</Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
