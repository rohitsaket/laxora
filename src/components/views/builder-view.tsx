"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, RotateCcw, Sparkles, ShoppingBag, Heart, Gem } from "lucide-react";
import { useStore, formatPrice } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const SHAPES = ["Round", "Oval", "Princess", "Emerald", "Cushion", "Pear", "Radiant", "Marquise"];
const COLORS = ["D", "E", "F", "G", "H", "I"];
const CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2"];
const CUTS = ["Excellent", "Very Good", "Good"];
const SETTINGS = [
  { id: "Solitaire", name: "Solitaire", desc: "Classic four-prong, diamond-forward", price: 1800 },
  { id: "Halo", name: "Halo", desc: "Pavé halo amplifies center stone", price: 3200 },
  { id: "Three-Stone", name: "Three-Stone", desc: "Two side stones frame the center", price: 4200 },
  { id: "Pavé", name: "Pavé Band", desc: "Band encrusted with pave diamonds", price: 3600 },
  { id: "Bezel", name: "Bezel", desc: "Modern metal surrounds stone", price: 2200 },
] as const;
const METALS = [
  { id: "Yellow Gold", name: "Yellow Gold", color: "#D4AF37" },
  { id: "White Gold", name: "White Gold", color: "#E8E8E8" },
  { id: "Rose Gold", name: "Rose Gold", color: "#B76E79" },
  { id: "Platinum", name: "Platinum", color: "#E5E4E2" },
] as const;

export function BuilderView() {
  const { builder, setBuilder, resetBuilder, builderPrice, addToCart, navigate, currency } = useStore();
  const [localShape, setLocalShape] = useState(builder.shape);

  const price = builderPrice();

  const goNext = () => {
    if (builder.step === 1 && !builder.shape) {
      toast.error("Please select a diamond shape");
      return;
    }
    setBuilder({ step: (builder.step + 1) as 1 | 2 | 3 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBack = () => setBuilder({ step: (builder.step - 1) as 1 | 2 | 3 });

  const handleAddToCart = () => {
    addToCart({
      productId: `custom-${Date.now()}`,
      name: `Custom ${builder.shape} ${builder.setting} Ring in ${builder.metal}`,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
      metal: builder.metal,
      carat: builder.carat,
      priceUSD: price,
      type: "custom",
    });
    toast.success("Custom design added to bag");
    resetBuilder();
    navigate("cart");
  };

  return (
    <div className="py-10 lg:py-14 max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">Bespoke Atelier</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">Custom Jewelry Builder</h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
          Design a one-of-a-kind piece. Choose a diamond, pair it with a setting, and select your metal — with live pricing.
        </p>
      </motion.div>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {[
          { n: 1, label: "Diamond" },
          { n: 2, label: "Setting" },
          { n: 3, label: "Metal & Finish" },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 ${builder.step === s.n ? "text-foreground" : builder.step > s.n ? "text-gold" : "text-muted-foreground"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${
                builder.step > s.n ? "bg-gold text-onyx border-gold" :
                builder.step === s.n ? "border-gold text-gold" : "border-border"
              }`}>
                {builder.step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
              </div>
              <span className="text-[10px] uppercase tracking-luxe-sm">{s.label}</span>
            </div>
            {i < 2 && <div className={`w-12 h-px ${builder.step > s.n ? "bg-gold" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={builder.step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {builder.step === 1 && (
                <div className="space-y-7">
                  <div>
                    <h2 className="font-display text-2xl mb-1">Step 1 · Choose Your Diamond</h2>
                    <p className="text-xs text-muted-foreground">Select a shape and configure the 4Cs.</p>
                  </div>

                  {/* Shape */}
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Shape</p>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                      {SHAPES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setBuilder({ shape: s })}
                          className={`aspect-square rounded-sm border flex flex-col items-center justify-center text-[10px] uppercase tracking-luxe-sm transition ${
                            builder.shape === s ? "border-gold bg-gold/10 text-gold" : "border-border hover:border-foreground/40"
                          }`}
                        >
                          <Gem className="w-5 h-5 mb-1" />
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Carat */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Carat Weight</p>
                      <span className="text-sm font-medium text-gold">{builder.carat.toFixed(2)}ct</span>
                    </div>
                    <Slider
                      min={0.3}
                      max={4}
                      step={0.05}
                      value={[builder.carat]}
                      onValueChange={(v) => setBuilder({ carat: v[0] })}
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>0.30ct</span><span>4.00ct</span>
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Color Grade</p>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((c) => (
                        <button
                          key={c}
                          onClick={() => setBuilder({ color: c })}
                          className={`w-12 h-12 rounded-sm text-sm font-medium border transition ${
                            builder.color === c ? "bg-gold text-onyx border-gold" : "border-border hover:border-foreground/40"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clarity */}
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Clarity</p>
                    <div className="flex flex-wrap gap-2">
                      {CLARITIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => setBuilder({ clarity: c })}
                          className={`px-4 h-10 rounded-sm text-xs font-medium border transition ${
                            builder.clarity === c ? "bg-gold text-onyx border-gold" : "border-border hover:border-foreground/40"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cut */}
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Cut Quality</p>
                    <div className="flex flex-wrap gap-2">
                      {CUTS.map((c) => (
                        <button
                          key={c}
                          onClick={() => setBuilder({ cut: c })}
                          className={`px-5 h-10 rounded-sm text-xs font-medium border transition ${
                            builder.cut === c ? "bg-gold text-onyx border-gold" : "border-border hover:border-foreground/40"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {builder.step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl mb-1">Step 2 · Select Your Setting</h2>
                    <p className="text-xs text-muted-foreground">The setting determines how the diamond is held and the ring's overall silhouette.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {SETTINGS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setBuilder({ setting: s.id as any })}
                        className={`text-left p-5 border rounded-sm transition ${
                          builder.setting === s.id ? "border-gold bg-gold/5" : "border-border hover:border-foreground/40"
                        }`}
                      >
                        <div className="aspect-square bg-muted rounded-sm mb-3 overflow-hidden">
                          <img
                            src={`https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80`}
                            alt={s.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-display text-lg">{s.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                        <p className="text-sm text-gold mt-2">From {formatPrice(s.price, currency)}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {builder.step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl mb-1">Step 3 · Choose Metal & Finish</h2>
                    <p className="text-xs text-muted-foreground">Select your preferred metal and add an optional engraving.</p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Metal</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {METALS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setBuilder({ metal: m.id as any })}
                          className={`p-4 border rounded-sm text-center transition ${
                            builder.metal === m.id ? "border-gold bg-gold/5" : "border-border hover:border-foreground/40"
                          }`}
                        >
                          <div
                            className="w-12 h-12 mx-auto rounded-full border-2 border-white/20 mb-2"
                            style={{ backgroundColor: m.color }}
                          />
                          <p className="text-xs">{m.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-2">Personalized Engraving (+$75)</p>
                    <input
                      type="text"
                      maxLength={30}
                      value={builder.engraving}
                      onChange={(e) => setBuilder({ engraving: e.target.value })}
                      placeholder="e.g. Forever yours, P&A"
                      className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-gold/60 rounded-sm"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">{builder.engraving.length}/30 characters</p>
                  </div>

                  <div className="p-5 border border-gold/30 bg-gold/5 rounded-sm">
                    <p className="text-[10px] uppercase tracking-luxe-sm text-gold mb-2">Design Summary</p>
                    <p className="font-display text-xl">
                      {builder.carat.toFixed(2)}ct {builder.shape} {builder.color} {builder.clarity} {builder.cut} in {builder.setting} · {builder.metal}
                    </p>
                    {builder.engraving && <p className="text-xs text-muted-foreground mt-1">Engraving: "{builder.engraving}"</p>}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex gap-3 mt-8">
            {builder.step > 1 && (
              <Button variant="outline" onClick={goBack}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            {builder.step < 3 ? (
              <Button onClick={goNext} className="bg-onyx text-foreground hover:bg-onyx/90 px-10">
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleAddToCart} className="bg-gold text-onyx hover:bg-gold/90 px-10 tracking-luxe-sm uppercase text-xs">
                <ShoppingBag className="w-4 h-4 mr-1.5" /> Add Design to Bag · {formatPrice(price, currency)}
              </Button>
            )}
            <Button variant="ghost" onClick={() => { resetBuilder(); toast("Design reset"); }}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
            </Button>
          </div>
        </div>

        {/* Live preview panel */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="p-6 border border-border rounded-sm bg-card">
            <div className="aspect-square bg-gradient-to-br from-secondary/40 to-secondary/5 rounded-sm mb-4 relative overflow-hidden flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[9px] uppercase tracking-luxe-sm bg-onyx/80 text-foreground px-2 py-1 rounded-sm">Live Preview</span>
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] glass-luxe px-2 py-1 rounded-sm">
                {builder.shape} · {builder.carat.toFixed(2)}ct
              </div>
            </div>

            <h3 className="font-display text-xl mb-1">Your Design</h3>
            <p className="text-xs text-muted-foreground mb-4">
              {builder.shape} · {builder.carat.toFixed(2)}ct · {builder.color} · {builder.clarity} · {builder.cut}
            </p>

            <Separator className="my-3" />

            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Setting</span><span>{builder.setting}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Metal</span><span>{builder.metal}</span></div>
              {builder.engraving && (
                <div className="flex justify-between"><span className="text-muted-foreground">Engraving</span><span className="truncate ml-2 max-w-[140px]">"{builder.engraving}"</span></div>
              )}
              <div className="flex justify-between"><span className="text-muted-foreground">Certificate</span><span>GIA</span></div>
            </div>

            <Separator className="my-3" />

            <div className="flex justify-between font-display text-2xl">
              <span>Total</span>
              <span className="text-gold">{formatPrice(price, currency)}</span>
            </div>

            <p className="text-[10px] text-muted-foreground mt-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold" />
              Hand-crafted in Antwerp · 3–4 week delivery
            </p>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={() => toast("Custom design saved to your account")}
            >
              <Heart className="w-3.5 h-3.5 mr-1.5" /> Save Design
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
