"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms & conditions.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessage("Account created successfully! Redirecting...");
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
              JOIN THE ARCHIVE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans">
              CREATE YOUR ACCOUNT
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Unlock exclusive drops, order tracking, and save your favorites.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/50 border border-red-500/50 text-red-400 text-xs font-mono rounded">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 bg-zinc-900 border border-emerald-500/40 text-emerald-400 text-xs font-mono rounded">
              {message}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                FULL NAME
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 pl-10 pr-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                />
              </div>
            </div>

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
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                PASSWORD
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 pl-10 pr-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 pl-10 pr-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
              />
              <label htmlFor="terms" className="text-[11px] font-mono text-zinc-400">
                I AGREE TO THE TERMS OF SERVICE &amp; PRIVACY POLICY
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full gap-2 mt-2"
            >
              <span>CREATE ACCOUNT</span>
              <ArrowRight size={16} />
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400">
            ALREADY REGISTERED?{" "}
            <Link
              href="/login"
              className="text-white font-bold underline underline-offset-2 hover:text-accent-volt"
            >
              SIGN IN
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
