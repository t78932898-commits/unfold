"use client";

import React from "react";
import Image from "next/image";
import {
  Mic,
  Sparkles,
  Layers,
  ShieldCheck,
  ArrowRight,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export function AiStylistSection() {
  const triggerConsultation = (question?: string) => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("open-ai-stylist", {
        detail: { question },
      });
      window.dispatchEvent(event);
    }
  };

  const capabilities = [
    {
      icon: Layers,
      title: "240 GSM SIZING & FIT CALIBRATION",
      desc: "Wondering if you should size up or stay true? Neha calculates your exact boxy drape based on your height and style preference.",
      prompt: "How does the 240 GSM boxy oversized fit work?",
    },
    {
      icon: Sparkles,
      title: "THE FOUR WORLDS AESTHETIC MATCH",
      desc: "Find your signature lane across Street/Urban, Art/Creative, Statement/Attitude, and Vintage/Culture collections.",
      prompt: "Which drop or aesthetic fits my vibe?",
    },
    {
      icon: Flame,
      title: "STREETWEAR OUTFIT STACKING",
      desc: "Get curated outfit formulas pairing heavyweight tees with parachute pants, utility cargos, and accessories.",
      prompt: "Recommend a streetwear outfit for tonight",
    },
    {
      icon: ShieldCheck,
      title: "PRINT DURABILITY & FABRIC CARE",
      desc: "Learn why our pre-shrunk combed cotton and high-density cracked prints survive 100+ machine washes.",
      prompt: "What are your best-selling graphic tees?",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-zinc-950 border-y border-zinc-800">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent-volt/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-purple-400 uppercase mb-3 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40">
              <Sparkles size={13} className="text-purple-400" />
              <span>UNFOLD AI LABS &bull; LIVE FASHION ASSISTANT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-sans">
              MEET NEHA — YOUR VIRTUAL STYLIST
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-3 md:mt-0 max-w-md leading-relaxed">
            Instant voice and chat consultations on streetwear sizing, fabric drape, and curated drops.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Stylist Profile Card */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
            {/* Top decorative gradient border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-accent-volt" />

            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full ring-4 ring-purple-600/30 overflow-hidden shrink-0">
                <Image
                  src="/images/ai-stylist-avatar.jpg"
                  alt="Neha AI Stylist"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-zinc-950 rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-white font-sans">
                    Neha
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    ONLINE
                  </span>
                </div>
                <p className="text-xs font-mono text-purple-300">
                  UNFOLD Fit &amp; Style Consultant
                </p>
              </div>
            </div>

            {/* Audio waveform illustration */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-1.5 h-8 mb-2">
                {[12, 24, 36, 18, 30, 14, 26, 32, 16].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-purple-500 rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ))}
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Ready for live voice consultation
              </p>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-6">
              &ldquo;Tell me your height, preferred aesthetic, or the occasion, and I&rsquo;ll dial in the right size and tee for your perspective.&rdquo;
            </p>

            <Button
              size="lg"
              onClick={() => triggerConsultation()}
              className="w-full gap-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold shadow-lg shadow-purple-600/25"
            >
              <Mic size={16} />
              <span>START VOICE CONVERSATION</span>
            </Button>
          </div>

          {/* Right Column: 4 Core AI Styling Capabilities */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => triggerConsultation(item.prompt)}
                  className="bg-zinc-950/80 border border-zinc-800/80 hover:border-purple-500/60 rounded-xl p-5 transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-purple-400 flex items-center gap-1 transition-colors">
                      <span>ASK NOW</span>
                      <ArrowRight size={11} />
                    </span>
                  </div>

                  <h4 className="text-xs font-mono font-bold uppercase text-white mb-2 tracking-wide group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
