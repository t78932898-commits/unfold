"use client";

import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeSwitcher() {
  const { theme, setTheme, mounted } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // When mounting or during SSR, default to dark representation
  const isDark = mounted ? theme === "dark" : true;

  return (
    <aside
      aria-label="Theme Mode Selection"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 select-none group"
    >
      {/* Floating Left Side Dock */}
      <div
        className={`flex flex-col items-center gap-1.5 p-1.5 rounded-2xl backdrop-blur-xl border transition-all duration-300 shadow-2xl ${
          isDark
            ? "bg-zinc-950/90 border-zinc-800 shadow-black/80"
            : "bg-white/95 border-zinc-200 shadow-zinc-400/40"
        }`}
      >
        {/* Micro Header / Mode Indicator */}
        <div className="pt-1 pb-0.5 px-1 flex flex-col items-center">
          <span
            className={`text-[8px] font-mono tracking-widest uppercase font-bold transition-colors ${
              isDark ? "text-zinc-500 group-hover:text-zinc-400" : "text-zinc-400 group-hover:text-zinc-600"
            }`}
          >
            MODE
          </span>
          <div
            className={`w-1.5 h-1.5 rounded-full mt-1 transition-all duration-500 ${
              isDark ? "bg-accent-volt shadow-[0_0_8px_#d4ff00]" : "bg-amber-500 shadow-[0_0_8px_#f59e0b]"
            }`}
          />
        </div>

        {/* Divider */}
        <div className={`w-5 h-px my-0.5 ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`} />

        {/* 1. DARK MODE BUTTON */}
        <button
          type="button"
          onClick={() => setTheme("dark")}
          aria-label="Switch to Dark Mode"
          title="Dark Theme"
          className={`relative group/btn flex flex-col items-center justify-center w-9 sm:w-11 py-2 rounded-xl transition-all duration-300 ${
            isDark
              ? "bg-zinc-900 text-white border border-accent-volt/60 shadow-[0_0_12px_rgba(212,255,0,0.15)]"
              : "text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 border border-transparent"
          }`}
        >
          <Moon
            size={16}
            className={`transition-transform duration-300 ${
              isDark ? "text-accent-volt scale-110 rotate-0" : "group-hover/btn:-rotate-12"
            }`}
          />
          <span
            className={`text-[8px] font-mono font-bold tracking-wider mt-1 uppercase transition-colors ${
              isDark ? "text-accent-volt" : "text-zinc-500"
            }`}
          >
            DARK
          </span>

          {/* Left indicator bar when active */}
          {isDark && (
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-4 bg-accent-volt rounded-full shadow-[0_0_6px_#d4ff00]" />
          )}

          {/* Tooltip on right */}
          <span
            className={`absolute left-full ml-3 px-2.5 py-1 rounded bg-black/90 text-white text-[10px] font-mono whitespace-nowrap pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 border border-zinc-800 shadow-lg z-50 ${
              isHovered ? "sm:block hidden" : "hidden"
            }`}
          >
            Dark Mode {isDark && "✓"}
          </span>
        </button>

        {/* 2. LIGHT MODE BUTTON */}
        <button
          type="button"
          onClick={() => setTheme("light")}
          aria-label="Switch to Light Mode"
          title="Light Theme"
          className={`relative group/btn flex flex-col items-center justify-center w-9 sm:w-11 py-2 rounded-xl transition-all duration-300 ${
            !isDark
              ? "bg-amber-500/10 text-zinc-900 border border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
              : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
          }`}
        >
          <Sun
            size={16}
            className={`transition-transform duration-300 ${
              !isDark ? "text-amber-500 scale-110 rotate-45" : "group-hover/btn:rotate-45"
            }`}
          />
          <span
            className={`text-[8px] font-mono font-bold tracking-wider mt-1 uppercase transition-colors ${
              !isDark ? "text-amber-600 font-extrabold" : "text-zinc-500"
            }`}
          >
            LIGHT
          </span>

          {/* Left indicator bar when active */}
          {!isDark && (
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-4 bg-amber-500 rounded-full shadow-[0_0_6px_#f59e0b]" />
          )}

          {/* Tooltip on right */}
          <span
            className={`absolute left-full ml-3 px-2.5 py-1 rounded bg-black/90 text-white text-[10px] font-mono whitespace-nowrap pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 border border-zinc-800 shadow-lg z-50 ${
              isHovered ? "sm:block hidden" : "hidden"
            }`}
          >
            Light Mode {!isDark && "✓"}
          </span>
        </button>
      </div>
    </aside>
  );
}
