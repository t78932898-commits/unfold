"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  ShoppingBag,
  Users,
  ArrowLeft,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/Container";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // On admin login page, render clean container without admin controls
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      window.location.href = "/admin/login";
    }
  };

  const adminNav = [
    { name: "OVERVIEW", href: "/admin", icon: LayoutDashboard },
    { name: "ALL PRODUCTS", href: "/admin/products", icon: Package },
    { name: "ADD PRODUCT", href: "/admin/products/new", icon: PlusCircle },
    { name: "CATEGORIES", href: "/admin/categories", icon: FolderTree },
    { name: "ORDERS", href: "/admin/orders", icon: ShoppingBag },
    { name: "CUSTOMERS", href: "/admin/customers", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Top Admin Bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-2.5 px-4 sm:px-8 sticky top-0 z-40 backdrop-blur-md bg-zinc-900/90">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-accent-volt text-black text-[10px] font-mono font-black px-2 py-0.5 rounded uppercase">
              ADMIN CONTROL
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-zinc-400">
              UNFOLD SECURE BACKEND
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/40">
              <ShieldCheck size={12} />
              <span>AUTHENTICATED</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:inline">BACK TO STOREFRONT</span>
              <span className="sm:hidden">STORE</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 border border-red-500/30 hover:bg-red-950/30 px-2.5 py-1 rounded transition-colors"
            >
              <LogOut size={13} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </div>

      <Container className="pt-8">
        {/* Admin Navigation Pills */}
        <div className="flex flex-wrap gap-2 pb-6 mb-8 border-b border-zinc-800">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-white text-black font-bold shadow"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <Icon size={14} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {children}
      </Container>
    </div>
  );
}
