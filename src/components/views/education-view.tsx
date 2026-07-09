"use client";

import { motion } from "framer-motion";
import { Sparkles, Droplet, Search, Scale, ArrowRight, Award, Gem, BookOpen, ChevronRight } from "lucide-react";
import { FOUR_CS, DIAMOND_SHAPES } from "@/lib/data";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ICONS: Record<string, any> = { Sparkles, Droplet, Search, Scale };

const CERTS = [
  { name: "GIA", full: "Gemological Institute of America", desc: "The global authority on diamond grading since 1931. GIA established the 4Cs standard used industry-wide." },
  { name: "IGI", full: "International Gemological Institute", desc: "The world's largest independent laboratory for grading diamonds and fine jewelry." },
  { name: "HRD", full: "Hoge Raad voor Diamant", desc: "Antwerp-based lab renowned for precision and ethical certification since 1973." },
  { name: "AGS", full: "American Gem Society", desc: "Pioneers of the cut-grading system, with strict standards for light performance." },
];

const BUYING_GUIDE = [
  { step: "01", title: "Set Your Budget", desc: "Decide on a range before browsing. LUXORA offers pieces from $1,500 to $100,000+ — clarity on budget helps our concierge curate the right selection." },
  { step: "02", title: "Prioritize Cut", desc: "Of the 4Cs, cut has the largest impact on visible beauty. Always choose Excellent or Very Good cut for maximum brilliance." },
  { step: "03", title: "Balance Color & Clarity", desc: "An eye-clean VS2 with G-H color appears identical to a flawless diamond — at a fraction of the price. Spend where it matters." },
  { step: "04", title: "Choose the Right Shape", desc: "Shape is personal. Round offers maximum brilliance; elongated shapes like Oval and Pear flatter the finger. Pick what speaks to you." },
  { step: "05", title: "Verify Certification", desc: "Only buy diamonds graded by GIA, IGI, HRD, or AGS. Every LUXORA diamond arrives with its original certificate." },
  { step: "06", title: "Consider the Setting", desc: "The setting protects the diamond and shapes the ring's character. Solitaires showcase the stone; halos amplify its size." },
];

export function EducationView() {
  const { navigate } = useStore();

  return (
    <div className="py-10 lg:py-14">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=2400&q=80"
          alt="Diamond education"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-onyx/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground text-center px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] uppercase tracking-luxe text-gold mb-3">LUXORA Knowledge Hub</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl">Diamond Education</h1>
            <p className="mt-5 text-sm md:text-base text-foreground/80 max-w-xl">
              Learn the language of diamonds. Understand what makes each stone rare, brilliant, and eternally valuable.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <Tabs defaultValue="4cs" className="mb-16">
          <TabsList className="w-full justify-center border-b border-border rounded-none bg-transparent h-auto p-0 mb-10">
            {[
              { v: "4cs", l: "The 4Cs" },
              { v: "shapes", l: "Diamond Shapes" },
              { v: "certs", l: "Certifications" },
              { v: "guide", l: "Buying Guide" },
            ].map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent text-xs uppercase tracking-luxe-sm py-3 px-5"
              >
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* 4Cs */}
          <TabsContent value="4cs">
            <SectionHeader
              eyebrow="The Universal Language"
              title="The 4Cs of Diamonds"
              subtitle="Cut, Color, Clarity, and Carat — the four qualities that determine a diamond's value."
            />
            <div className="grid md:grid-cols-2 gap-6">
              {FOUR_CS.map((c, i) => {
                const Icon = ICONS[c.icon] ?? Sparkles;
                return (
                  <motion.div
                    key={c.key}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="p-7 border border-border rounded-sm bg-card hover:border-gold/40 hover:shadow-luxe transition"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-luxe text-gold">{c.tagline}</p>
                        <h3 className="font-display text-2xl mt-1">{c.name}</h3>
                      </div>
                      <span className="font-display text-3xl text-gold/30">{i + 1}</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed mt-4">{c.description}</p>
                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-2">Grade Scale</p>
                      <div className="flex flex-wrap gap-1.5">
                        {c.grades.map((g) => (
                          <span key={g} className="px-2.5 py-1 text-[10px] bg-secondary/60 border border-border rounded-sm">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Shapes */}
          <TabsContent value="shapes">
            <SectionHeader
              eyebrow="Personal Expression"
              title="Diamond Shapes"
              subtitle="Shape is the geometry of the diamond — distinct from cut, which measures craftsmanship."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {DIAMOND_SHAPES.map((s, i) => (
                <motion.button
                  key={s.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onClick={() => navigate("diamonds")}
                  className="group text-left"
                >
                  <div className="aspect-square bg-muted rounded-sm overflow-hidden mb-3">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="font-display text-lg">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </motion.button>
              ))}
            </div>
          </TabsContent>

          {/* Certifications */}
          <TabsContent value="certs">
            <SectionHeader
              eyebrow="Independent Verification"
              title="Diamond Certifications"
              subtitle="Every LUXORA diamond arrives with an independent grading certificate from a globally recognized laboratory."
            />
            <div className="grid md:grid-cols-2 gap-6">
              {CERTS.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-6 border border-border rounded-sm bg-card flex gap-5"
                >
                  <div className="w-16 h-16 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <p className="font-display text-2xl text-gold">{c.name}</p>
                    <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">{c.full}</p>
                    <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-8 border border-gold/30 bg-gold/5 rounded-sm text-center">
              <p className="font-display text-2xl mb-2">Verify Your Certificate</p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                Every certificate includes a unique ID. Verify authenticity directly on the laboratory's website.
              </p>
              <Button
                onClick={() => navigate("diamonds")}
                className="bg-gold text-onyx hover:bg-gold/90"
              >
                Browse Certified Diamonds <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </TabsContent>

          {/* Buying Guide */}
          <TabsContent value="guide">
            <SectionHeader
              eyebrow="Expert Advice"
              title="The LUXORA Buying Guide"
              subtitle="Six steps to confidently choosing a diamond you'll treasure for life."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {BUYING_GUIDE.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-6 border border-border rounded-sm bg-card"
                >
                  <p className="font-display text-3xl text-gold/40">{s.step}</p>
                  <h3 className="font-display text-xl mt-2">{s.title}</h3>
                  <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="p-7 border border-border rounded-sm bg-card">
                <BookOpen className="w-6 h-6 text-gold mb-3" />
                <h3 className="font-display text-2xl">Still have questions?</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Our gemologists are available for complimentary consultations, in boutique or virtually.
                </p>
                <Button
                  onClick={() => navigate("appointments")}
                  variant="outline"
                  className="mt-4 border-gold/40 text-gold hover:bg-gold hover:text-onyx"
                >
                  Book a Consultation <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="p-7 border border-border rounded-sm bg-card">
                <Gem className="w-6 h-6 text-gold mb-3" />
                <h3 className="font-display text-2xl">Ready to shop?</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Browse our vault of certified diamonds, or start designing a custom piece.
                </p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => navigate("diamonds")} variant="outline">
                    Loose Diamonds
                  </Button>
                  <Button onClick={() => navigate("builder")} className="bg-gold text-onyx hover:bg-gold/90">
                    Build Your Own
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
