"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Truck, Calendar, X } from "lucide-react";

const messages = [
  { icon: Truck, text: "Complimentary worldwide shipping & 30-day returns" },
  { icon: Sparkles, text: "GIA & IGI certified diamonds — ethically sourced" },
  { icon: Calendar, text: "Book a private appointment in Antwerp, Mumbai, New York & more" },
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 4500);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;
  const Icon = messages[idx].icon;
  return (
    <div className="bg-onyx text-foreground/90 border-b border-white/5 text-[11px] tracking-luxe-sm uppercase relative z-50">
      <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <Icon className="w-3.5 h-3.5 text-gold" />
            <span className="text-foreground/80">{messages[idx].text}</span>
          </motion.div>
        </AnimatePresence>
        <button
          aria-label="Dismiss announcement"
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
