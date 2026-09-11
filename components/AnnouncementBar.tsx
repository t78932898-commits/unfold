"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 text-neutral-300 text-[11px] font-mono tracking-widest py-2 px-4 relative flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-4 text-center">
        <span className="inline-block w-2 h-2 rounded-full bg-accent-volt animate-pulse" />
        <p className="uppercase">
          DROP 01: URBAN METAMORPHOSIS AVAILABLE NOW &bull; FREE SHIPPING ON ORDERS OVER ₹999 &bull;{" "}
          <Link href="/shop" className="text-white underline underline-offset-2 hover:text-accent-volt ml-1 font-semibold">
            SHOP NOW
          </Link>
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement bar"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200"
      >
        <X size={14} />
      </button>
    </div>
  );
}
