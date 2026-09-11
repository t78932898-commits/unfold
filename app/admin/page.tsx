import React from "react";
import Link from "next/link";
import { Package, TrendingUp, ShoppingBag, AlertTriangle, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { getCategories, getProducts } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const totalRevenue = 487200;
  const totalOrders = 214;
  const lowStockProducts = products.filter((p) =>
    p.variants.some((v) => v.stock < 10)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
          ADMIN DASHBOARD OVERVIEW
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Real-time metrics for inventory, orders, and perspective catalog performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
            <span>GROSS REVENUE</span>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-mono font-bold text-white">
            {formatCurrency(totalRevenue)}
          </p>
          <span className="text-[11px] font-mono text-emerald-400">
            +18.4% FROM PREVIOUS MONTH
          </span>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
            <span>TOTAL ORDERS</span>
            <ShoppingBag size={16} className="text-accent-volt" />
          </div>
          <p className="text-2xl font-mono font-bold text-white">
            {totalOrders}
          </p>
          <span className="text-[11px] font-mono text-zinc-400">
            94% FULFILLED ON SCHEDULE
          </span>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
            <span>ACTIVE PRODUCTS</span>
            <Package size={16} className="text-sky-400" />
          </div>
          <p className="text-2xl font-mono font-bold text-white">
            {products.length}
          </p>
          <span className="text-[11px] font-mono text-zinc-400">
            ACROSS {categories.length} PERSPECTIVE WORLDS
          </span>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
            <span>LOW INVENTORY ALERTS</span>
            <AlertTriangle size={16} className="text-amber-400" />
          </div>
          <p className="text-2xl font-mono font-bold text-amber-400">
            {lowStockProducts.length}
          </p>
          <span className="text-[11px] font-mono text-zinc-400">
            REQUIRES PRODUCTION RE-STOCK
          </span>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Catalog Summary */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              ACTIVE PERSPECTIVE WORLDS
            </h2>
            <Link
              href="/admin/categories"
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <span>MANAGE</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-zinc-800/80">
            {categories.map((cat) => (
              <div key={cat.id} className="py-3 flex justify-between items-center text-xs font-mono">
                <div>
                  <span className="font-bold text-white uppercase">{cat.name}</span>
                  <span className="text-zinc-500 block text-[11px]">slug: {cat.slug}</span>
                </div>
                <span className="bg-zinc-800 px-2.5 py-1 rounded text-zinc-300">
                  {cat.productCount ?? 0} TEES
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch & Recent Activity */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              ADMIN SHORTCUTS
            </h2>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="block p-3.5 bg-zinc-950 border border-zinc-800 rounded hover:border-zinc-600 transition-colors"
            >
              <span className="text-xs font-mono font-bold text-white uppercase block">
                + ADD NEW T-SHIRT (NO CODE EDIT)
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Publish a new 240 GSM drop with sizes, images, and inventory.
              </span>
            </Link>

            <Link
              href="/admin/products"
              className="block p-3.5 bg-zinc-950 border border-zinc-800 rounded hover:border-zinc-600 transition-colors"
            >
              <span className="text-xs font-mono font-bold text-white uppercase block">
                INVENTORY &amp; VARIANT MANAGER
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Adjust stock levels, update pricing, or toggle publish states.
              </span>
            </Link>

            <Link
              href="/admin/orders"
              className="block p-3.5 bg-zinc-950 border border-zinc-800 rounded hover:border-zinc-600 transition-colors"
            >
              <span className="text-xs font-mono font-bold text-white uppercase block">
                VIEW RECENT CUSTOMER ORDERS
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Inspect shipping addresses, line items, and fulfillment stages.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
