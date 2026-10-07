"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mic,
  MicOff,
  X,
  Send,
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX,
  MessageSquare,
  ShoppingBag,
} from "lucide-react";
import {
  getStylistResponse,
  SUGGESTED_QUESTIONS,
  StylistProductSuggestion,
} from "@/lib/ai-stylist";

interface Message {
  sender: "user" | "neha";
  text: string;
  time: string;
  products?: StylistProductSuggestion[];
}

export function AiStylistWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [viewMode, setViewMode] = useState<"welcome" | "chat">("welcome");

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition & Synthesis capabilities
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = "en-US";

          recognition.onstart = () => {
            setIsListening(true);
          };

          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) {
              handleUserQuestion(transcript);
            }
          };

          recognition.onerror = () => {
            setIsListening(false);
            setIsVoiceActive(false);
          };

          recognition.onend = () => {
            setIsListening(false);
          };

          recognitionRef.current = recognition;
        } catch {
          setSpeechSupported(false);
        }
      } else {
        setSpeechSupported(false);
      }
    }

    // Listen to global open events from the homepage section
    const handleGlobalTrigger = (e: CustomEvent) => {
      setIsOpen(true);
      if (e.detail?.question) {
        handleUserQuestion(e.detail.question);
      }
    };

    window.addEventListener("open-ai-stylist" as any, handleGlobalTrigger);
    return () => {
      window.removeEventListener("open-ai-stylist" as any, handleGlobalTrigger);
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (viewMode === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, viewMode]);

  // Text-To-Speech Output
  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      // Select natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(
        (v) =>
          v.name.includes("Female") ||
          v.name.includes("Samantha") ||
          v.name.includes("Google UK English Female") ||
          v.name.includes("Zira")
      );
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startVoiceInput = () => {
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        setIsVoiceActive(true);
        recognitionRef.current.start();
      } catch {
        // Recognition already started or error
      }
    } else {
      // Fallback if browser blocks microphone
      handleUserQuestion("How does the 240 GSM boxy oversized fit work?");
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
    setIsVoiceActive(false);
  };

  const handleUserQuestion = (queryText: string) => {
    if (!queryText.trim()) return;

    setViewMode("chat");
    stopSpeaking();

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      sender: "user",
      text: queryText,
      time: timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate smart thinking delay
    setTimeout(() => {
      const response = getStylistResponse(queryText);
      const nehaMessage: Message = {
        sender: "neha",
        text: response.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        products: response.productSuggestions,
      };

      setMessages((prev) => [...prev, nehaMessage]);

      if (soundEnabled) {
        speakText(response.voiceText);
      }
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleUserQuestion(inputValue);
    }
  };

  const resetToWelcome = () => {
    stopSpeaking();
    stopVoiceInput();
    setViewMode("welcome");
  };

  return (
    <>
      {/* 1. FLOATING PILL BUTTON (MATCHING REFERENCE IMAGE 1) */}
      {!isOpen && (
        <aside aria-label="Live AI Assistant trigger">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full px-4 py-2.5 shadow-2xl shadow-purple-600/40 border border-purple-400/40 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Open AI Fashion Stylist consultation"
        >
          {/* Avatar with pulsing green live dot */}
          <div className="relative w-9 h-9 rounded-full ring-2 ring-purple-300/60 overflow-hidden shrink-0 shadow-md">
            <Image
              src="/images/ai-stylist-avatar.jpg"
              alt="Neha AI Stylist"
              fill
              className="object-cover"
              sizes="36px"
            />
            {/* Online Green Indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-purple-700 rounded-full animate-pulse" />
          </div>

          {/* Text block */}
          <div className="text-left pr-1">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-bold text-sm text-white tracking-tight">
                Talk to Neha
              </span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-purple-100 font-medium tracking-wide">
              <Mic size={11} className="text-purple-200" />
              <span>Live AI Assistant</span>
            </div>
          </div>
        </button>
        </aside>
      )}

      {/* 2. LIVE CONSULTATION MODAL (MATCHING REFERENCE IMAGE 2) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-stylist-title"
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[88vh] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full ring-2 ring-purple-500/40 overflow-hidden shrink-0">
                <Image
                  src="/images/ai-stylist-avatar.jpg"
                  alt="Neha"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full" />
              </div>
              <div>
                <h3 id="ai-stylist-title" className="font-bold text-sm text-zinc-900 dark:text-white leading-tight">
                  Neha
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[170px]">
                  UNFOLD Stylist &amp; Fit Consultant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Ready to talk pill badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Ready to talk</span>
              </span>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) stopSpeaking();
                  setSoundEnabled(!soundEnabled);
                }}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title={soundEnabled ? "Mute voice" : "Enable voice"}
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  stopVoiceInput();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {viewMode === "welcome" ? (
              /* WELCOME / VOICE CONSULTATION SCREEN (REFERENCE IMAGE 2) */
              <div className="space-y-6 pt-2">
                {/* Center Audio Waveform Circle */}
                <div className="flex justify-center pt-2">
                  <div
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isSpeaking || isListening
                        ? "bg-purple-100 dark:bg-purple-950/60 ring-8 ring-purple-500/20 scale-105"
                        : "bg-purple-50 dark:bg-purple-950/30 ring-4 ring-purple-100 dark:ring-purple-900/20"
                    }`}
                  >
                    {/* Animated Equalizer Waveform Bars */}
                    <div className="flex items-center justify-center gap-1.5 h-10">
                      {[14, 28, 40, 24, 32, 18].map((height, i) => (
                        <span
                          key={i}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            isSpeaking || isListening
                              ? "bg-purple-600 dark:bg-purple-400 animate-pulse"
                              : "bg-purple-500/70 dark:bg-purple-400/60"
                          }`}
                          style={{
                            height: isSpeaking || isListening ? `${height}px` : "16px",
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explanatory Prompt */}
                <div className="text-center px-4">
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {isListening
                      ? "Listening to your voice... Ask about sizing, fabrics, or streetwear drops."
                      : isSpeaking
                      ? "Neha is speaking... (Audio playing)"
                      : "Click the mic to start a live voice consultation about drops, sizing, styling & fabric fit."}
                  </p>
                </div>

                {/* Suggested Questions Section */}
                <div className="space-y-2.5 pt-1">
                  <p className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500 font-bold px-1">
                    SUGGESTED QUESTIONS
                  </p>

                  <div className="space-y-2">
                    {SUGGESTED_QUESTIONS.map((question, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleUserQuestion(question)}
                        className="w-full text-left p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 hover:bg-zinc-100/80 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 hover:border-purple-300 dark:hover:border-purple-800 text-xs font-medium text-zinc-700 dark:text-zinc-200 flex items-center justify-between group transition-all"
                      >
                        <span className="line-clamp-1">{question}</span>
                        <ArrowRight
                          size={14}
                          className="text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Button: Start Voice Conversation */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={isListening ? stopVoiceInput : startVoiceInput}
                    className={`w-full py-3.5 px-6 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600 shadow-red-500/30 animate-pulse"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30 hover:scale-[1.01]"
                    }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff size={16} />
                        <span>Stop Listening</span>
                      </>
                    ) : (
                      <>
                        <Mic size={16} />
                        <span>Start Voice Conversation</span>
                      </>
                    )}
                  </button>

                  <div className="mt-3 text-center">
                    <button
                      type="button"
                      onClick={() => setViewMode("chat")}
                      className="text-[11px] font-mono text-zinc-400 hover:text-purple-500 dark:hover:text-purple-400 underline underline-offset-4"
                    >
                      Or switch to text chat &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* CHAT / CONVERSATION VIEW */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-400">
                  <button
                    type="button"
                    onClick={resetToWelcome}
                    className="hover:text-purple-500 flex items-center gap-1 font-mono"
                  >
                    &larr; Back to Voice Mode
                  </button>
                  <span className="font-mono">Live Session</span>
                </div>

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-purple-600 text-white rounded-br-none"
                          : "bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-zinc-200/80 dark:border-zinc-800"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Product Recommendation Cards from Neha */}
                      {msg.products && msg.products.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                          <p className="text-[10px] font-mono uppercase text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1">
                            <Sparkles size={11} />
                            <span>RECOMMENDED STREETWEAR DROPS:</span>
                          </p>

                          <div className="grid grid-cols-1 gap-2">
                            {msg.products.map((item, pIdx) => (
                              <Link
                                key={pIdx}
                                href={`/product/${item.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 transition-colors group"
                              >
                                <div className="relative w-10 h-12 bg-zinc-800 rounded overflow-hidden shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-bold truncate text-zinc-900 dark:text-white group-hover:text-purple-500">
                                    {item.name}
                                  </p>
                                  <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                                    ₹{item.price} &bull; {item.fit}
                                  </p>
                                </div>
                                <ArrowRight
                                  size={13}
                                  className="text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all mr-1"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}

                {isSpeaking && (
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-mono animate-pulse">
                    <Volume2 size={13} />
                    <span>Neha is speaking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              <button
                type="button"
                onClick={isListening ? stopVoiceInput : startVoiceInput}
                className={`p-2 rounded-full transition-colors ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 hover:bg-purple-200"
                }`}
                title={isListening ? "Stop listening" : "Speak to Neha"}
              >
                <Mic size={15} />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about sizing, fabric, or styles..."
                className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-purple-500"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 rounded-full bg-purple-600 disabled:opacity-40 text-white hover:bg-purple-700 transition-colors"
                title="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
