"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      {/* Brand Manifesto & Newsletter Strip */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-mono tracking-widest text-accent-volt uppercase">
              THE UNFOLD MANIFESTO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white font-sans">
              WEAR YOUR PERSPECTIVE.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              We reject generic fashion. UNFOLD is a canvas for those whose minds operate outside the default setting. Every drop is crafted in limited numbers on 240 GSM heavy combed cotton, built to outlast fleeting trends.
            </p>
          </div>

          <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-white block mb-2">
              JOIN THE PERSPECTIVE ARCHIVE
            </span>
            <p className="text-xs text-zinc-400 mb-4 font-mono">
              Get secret drop links, exclusive member pricing, and limited edition release access.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for joining the UNFOLD Perspective Archive.");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="YOUR EMAIL ADDRESS"
                className="bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider rounded flex-1 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="bg-white text-black text-xs font-mono font-bold uppercase px-5 py-2.5 rounded hover:bg-zinc-200 transition-colors shrink-0"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo & Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white font-sans">
              UNFOLD
            </Link>
            <p className="text-xs font-mono text-zinc-400 max-w-xs leading-relaxed">
              Graphic printed T-shirts engineered for self-expression, creativity, and unique perspectives.
            </p>
            <div className="flex gap-3 text-xs font-mono">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 text-zinc-400 hover:text-white"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight size={12} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 text-zinc-400 hover:text-white"
              >
                <span>TWITTER</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Worlds */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              THE 4 WORLDS
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/category/street-urban" className="hover:text-white transition-colors">
                  STREET / URBAN
                </Link>
              </li>
              <li>
                <Link href="/category/art-creative" className="hover:text-white transition-colors">
                  ART / CREATIVE
                </Link>
              </li>
              <li>
                <Link href="/category/statement-attitude" className="hover:text-white transition-colors">
                  STATEMENT / ATTITUDE
                </Link>
              </li>
              <li>
                <Link href="/category/vintage-culture" className="hover:text-white transition-colors">
                  VINTAGE / CULTURE
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              EXPLORE
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  ALL PRODUCTS
                </Link>
              </li>
              <li>
                <Link href="/shop?badge=NEW" className="hover:text-white transition-colors">
                  NEW ARRIVALS
                </Link>
              </li>
              <li>
                <Link href="/shop?badge=BEST+SELLER" className="hover:text-white transition-colors">
                  BEST SELLERS
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  YOUR BAG
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  MY ACCOUNT
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              CLIENT CARE
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <span className="text-zinc-500">SIZE GUIDE (240 GSM)</span>
              </li>
              <li>
                <span className="text-zinc-500">SHIPPING &amp; RETURNS</span>
              </li>
              <li>
                <span className="text-zinc-500">TERMS &amp; PRIVACY</span>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-400 hover:text-white transition-colors">
                  ADMIN PORTAL &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-zinc-500">
          <p>&copy; {new Date().getFullYear()} UNFOLD CLOTHING CO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span>IN / INR (₹)</span>
            <span>SECURE CHECKOUT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
