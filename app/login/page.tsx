"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessage("Login successful. Redirecting to your perspective dashboard...");
      setTimeout(() => {
        window.location.href = "/account";
      }, 1000);
    }, 1200);
  };

  return (
    <div className="py-20">
      <Container size="narrow" className="max-w-md">
        <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-accent-volt uppercase">
              CLIENT PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans">
              SIGN IN TO UNFOLD
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Access your orders, addresses, and saved perspective wishlist.
            </p>
          </div>

          {message && (
            <div className="p-3 bg-zinc-900 border border-emerald-500/40 text-emerald-400 text-xs font-mono rounded">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 pl-10 pr-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  PASSWORD
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-mono text-zinc-500 hover:text-accent-volt uppercase transition-colors"
                >
                  FORGOT PASSWORD?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 pl-10 pr-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full gap-2 mt-2"
            >
              <span>SIGN IN</span>
              <ArrowRight size={16} />
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400">
            DON&apos;T HAVE AN ACCOUNT?{" "}
            <Link
              href="/signup"
              className="text-white font-bold underline underline-offset-2 hover:text-accent-volt"
            >
              CREATE ONE
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
