"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  cta?: { label: string; onClick: () => void };
}

export function SectionHeader({ eyebrow, title, subtitle, align = "center", cta }: Props) {
  const { } = useStore();
  return (
    <div
      className={`flex flex-col gap-3 mb-12 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-luxe text-gold"
        >
          <Sparkles className="w-3 h-3" />
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`text-sm md:text-base text-muted-foreground max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      {cta && (
        <button
          onClick={cta.onClick}
          className="mt-2 group inline-flex items-center gap-2 text-xs uppercase tracking-luxe-sm border-b border-foreground/30 pb-1 hover:border-gold hover:text-gold transition"
        >
          {cta.label}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
        </button>
      )}
    </div>
  );
}
