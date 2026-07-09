"use client";

import { useState } from "react";
import { Gem, Mail, MapPin, Phone, Instagram, Facebook, Twitter, Youtube, ArrowRight } from "lucide-react";
import { useStore, type ViewName } from "@/lib/store";
import { toast } from "sonner";

const footerCols: { title: string; links: { label: string; view?: ViewName; opts?: Record<string, string> }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Engagement Rings", view: "shop", opts: { shopCategory: "Engagement Rings" } },
      { label: "Wedding Bands", view: "shop", opts: { shopCategory: "Wedding Bands" } },
      { label: "Necklaces", view: "shop", opts: { shopCategory: "Necklaces" } },
      { label: "Earrings", view: "shop", opts: { shopCategory: "Earrings" } },
      { label: "Bracelets", view: "shop", opts: { shopCategory: "Bracelets" } },
      { label: "Loose Diamonds", view: "diamonds" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Custom Jewelry Builder", view: "builder" },
      { label: "Diamond Education", view: "education" },
      { label: "Book Appointment", view: "appointments" },
      { label: "Virtual Consultation", view: "appointments" },
      { label: "My Account", view: "account" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Shipping & Returns" },
      { label: "Lifetime Warranty" },
      { label: "Insurance & Appraisal" },
      { label: "Ring Sizing Guide" },
      { label: "Care & Maintenance" },
      { label: "FAQs" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Heritage" },
      { label: "Craftsmanship" },
      { label: "Ethical Sourcing" },
      { label: "Sustainability" },
      { label: "Careers" },
      { label: "Press" },
    ],
  },
];

export function Footer() {
  const { navigate } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("Welcome to LUXORA. Check your inbox for a private invitation.");
    setEmail("");
  };

  return (
    <footer className="bg-onyx text-foreground mt-auto">
      {/* Newsletter band */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-gold mb-3">LUXORA Privé</p>
            <h3 className="font-display text-3xl lg:text-4xl">
              Join the inner circle of connoisseurs.
            </h3>
            <p className="text-sm text-foreground/60 mt-2 max-w-md">
              Receive private invitations to new collections, atelier events, and bespoke commissions — before they reach the public.
            </p>
          </div>
          <form onSubmit={onSubscribe} className="flex gap-3 w-full max-w-md lg:ml-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-gold/60 transition rounded-sm"
            />
            <button
              type="submit"
              className="bg-gold text-onyx px-6 py-3 text-xs uppercase tracking-luxe-sm font-medium hover:bg-gold/90 transition flex items-center gap-2 rounded-sm"
            >
              {subscribed ? "Subscribed" : "Join"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer body */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        <div className="col-span-2 lg:col-span-2">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-gold" />
            <span className="font-display text-2xl tracking-luxe">LUXORA</span>
          </button>
          <p className="text-sm text-foreground/60 mt-4 max-w-xs leading-relaxed">
            A house of certified diamonds and fine jewelry, crafted in Antwerp since 1924. Every LUXORA piece carries a lifetime warranty and a story.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <p className="text-[10px] uppercase tracking-luxe text-gold mb-4">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <button
                    className="text-sm text-foreground/70 hover:text-foreground transition text-left"
                    onClick={() => l.view && navigate(l.view, l.opts)}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust band */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] text-foreground/60">
          <div className="flex items-center gap-2">
            <span className="text-gold">★</span> GIA & IGI Certified
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold">✦</span> Lifetime Warranty
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold">◆</span> Ethically Sourced
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold">⬡</span> Free Worldwide Shipping
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-foreground/50">
          <p>© {new Date().getFullYear()} LUXORA Maison Joaillerie. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Cookie Settings</a>
            <a href="#" className="hover:text-foreground">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
