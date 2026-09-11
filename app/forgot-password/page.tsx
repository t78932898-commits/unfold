"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="py-20">
      <Container size="narrow" className="max-w-md">
        <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-accent-volt uppercase">
              RECOVER ACCESS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans">
              RESET PASSWORD
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Enter your registered email. We&apos;ll dispatch a secure recovery link.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-4 bg-zinc-900 border border-emerald-500/50 rounded space-y-3 text-center">
              <p className="text-xs font-mono text-emerald-400">
                Password reset link has been dispatched to: <strong>{email}</strong>
              </p>
              <p className="text-[11px] font-mono text-zinc-400">
                Please inspect your inbox (and spam folder). The link will expire in 15 minutes.
              </p>
              <Link href="/login" className="inline-block mt-3">
                <Button size="sm" variant="outline">
                  RETURN TO SIGN IN
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                className="w-full gap-2 mt-2"
              >
                <span>SEND RESET LINK</span>
                <ArrowRight size={16} />
              </Button>
            </form>
          )}

          <div className="text-center pt-4 border-t border-zinc-800">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={14} />
              <span>BACK TO LOGIN</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
