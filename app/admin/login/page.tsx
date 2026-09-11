"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/Button";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect");
  const redirectUrl = (rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//"))
    ? rawRedirect
    : "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Invalid administrator credentials.");
        setIsLoading(false);
        return;
      }

      // Success - navigate to admin destination
      router.push(redirectUrl);
      router.refresh();
    } catch (err) {
      setErrorMessage("Network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Security Warning Badge */}
        <div className="mb-6 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/40 bg-red-950/30 text-red-400 text-[10px] font-mono uppercase tracking-widest">
            <ShieldAlert size={13} />
            <span>RESTRICTED AREA &bull; AUTHORIZED PERSONNEL ONLY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
            UNFOLD ADMIN CONTROL
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Backend inventory &amp; product management system.
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-500/50 rounded text-red-300 text-xs font-mono flex items-start gap-2">
              <ShieldAlert size={16} className="shrink-0 text-red-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5 font-bold">
                ADMIN EMAIL
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@unfold.store"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 pl-10 pr-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-accent-volt transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5 font-bold">
                ADMIN PASSKEY
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 pl-10 pr-10 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-accent-volt transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full gap-2 mt-4 bg-accent-volt text-black hover:bg-lime-400 font-mono font-bold"
            >
              <span>ACCESS ADMIN</span>
              <ArrowRight size={16} />
            </Button>
          </form>

          {/* Quick Credential Hint Box for Administrator */}
          <div className="p-3 bg-zinc-950/80 border border-zinc-800/80 rounded text-[11px] font-mono text-zinc-400 space-y-1">
            <p className="text-zinc-300 font-bold uppercase text-[10px] tracking-wider text-accent-volt">
              CONFIGURED CREDENTIALS:
            </p>
            <p>Email: <code className="text-zinc-200">admin@unfold.store</code></p>
            <p>Password: <code className="text-zinc-200">unfold@admin2026</code></p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            &larr; Return to Public Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500 font-mono text-xs">
          AUTHENTICATING SYSTEM...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
