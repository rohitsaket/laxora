"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const INTRO: Msg = {
  role: "assistant",
  content:
    "Bonjour, I'm Aria — your LUXORA diamond concierge. Whether you're choosing an engagement ring, learning about the 4Cs, or exploring bespoke design, I'm here to guide you. What brings you to LUXORA today?",
};

const QUICK_PROMPTS = [
  "Help me choose an engagement ring",
  "Explain the 4Cs",
  "Best diamond under $8,000",
  "What is the Custom Builder?",
];

export function AIAssistant() {
  const { aiChatOpen, setAiChatOpen } = useStore();
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I apologize — I had trouble responding. Please try again in a moment.",
        },
      ]);
      toast.error("AI assistant unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!aiChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setAiChatOpen(true)}
            aria-label="Open AI concierge"
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gold text-onyx flex items-center justify-center shadow-gold-glow hover:scale-105 transition"
          >
            <Sparkles className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {aiChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="fixed bottom-6 right-6 z-40 w-[calc(100vw-3rem)] sm:w-[400px] h-[560px] max-h-[80vh] bg-background border border-border rounded-lg shadow-luxe flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-onyx text-foreground p-4 flex items-center gap-3 border-b border-gold/20">
              <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg leading-tight">Aria</p>
                <p className="text-[10px] uppercase tracking-luxe-sm text-gold">LUXORA Concierge · Online</p>
              </div>
              <button
                onClick={() => setAiChatOpen(false)}
                className="text-foreground/60 hover:text-foreground p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-gold text-onyx rounded-br-sm"
                        : "bg-card border border-border rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border p-3 rounded-lg rounded-bl-sm flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gold/60"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Quick questions</p>
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="block w-full text-left text-xs p-2.5 bg-card border border-border rounded-md hover:border-gold/40 hover:text-gold transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-background">
              <div className="flex gap-2 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  placeholder="Ask Aria anything…"
                  className="flex-1 bg-secondary/40 border border-border rounded-md px-3 py-2 text-xs resize-none focus:outline-none focus:border-gold/60 max-h-24"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="w-9 h-9 rounded-md bg-gold text-onyx flex items-center justify-center hover:bg-gold/90 disabled:opacity-40 transition flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-muted-foreground mt-1.5 text-center">
                Aria is an AI concierge · Always verify with a gemologist for major purchases
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
