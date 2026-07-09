"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown, Sparkles, Gem, Award, Shield, Leaf, Globe, Star } from "lucide-react";
import { useStore, formatPrice } from "@/lib/store";
import { COLLECTIONS, PRODUCTS, DIAMOND_SHAPES, TESTIMONIALS, INSTAGRAM_IMAGES, FOUR_CS } from "@/lib/data";
import { ProductCard } from "@/components/shared/product-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

export function HomeView() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturedCollections />
      <ShopByCategory />
      <LooseDiamondCollection />
      <NewArrivals />
      <BestSellers />
      <BridalSection />
      <CustomBuilderPromo />
      <EducationPreview />
      <BrandStory />
      <CraftsmanshipTimeline />
      <TrustCertifications />
      <Testimonials />
      <InstagramGallery />
      <NewsletterSection />
    </div>
  );
}

/* ============ Hero ============ */
function HeroSection() {
  const { navigate } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[92vh] min-h-[640px] overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2400&q=80"
          alt="LUXORA luxury jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-onyx/30 to-background" />
        <div className="absolute inset-0 bg-radial-luxe" />
      </motion.div>

      <motion.div
        style={{ y: y2, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-foreground"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-luxe text-gold mb-6"
        >
          <span className="w-8 h-px bg-gold/60" />
          Antwerp · Est. 1924
          <span className="w-8 h-px bg-gold/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl"
        >
          Brilliance,
          <br />
          <span className="text-gold-gradient italic">eternalized.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-6 text-sm md:text-base text-foreground/80 max-w-xl"
        >
          Certified diamonds, hand-set by Antwerp master artisans.
          Discover engagement rings, fine jewelry, and bespoke commissions
          crafted to last generations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <Button
            onClick={() => navigate("shop", { shopCategory: "Engagement Rings" })}
            className="bg-gold text-onyx hover:bg-gold/90 h-12 px-8 tracking-luxe-sm uppercase text-xs"
          >
            Explore Engagement <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            onClick={() => navigate("builder")}
            variant="outline"
            className="border-foreground/30 text-foreground hover:border-gold hover:text-gold h-12 px-8 tracking-luxe-sm uppercase text-xs bg-transparent"
          >
            Build Your Ring
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/60"
      >
        <span className="text-[10px] uppercase tracking-luxe-sm">Scroll to discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============ Featured Collections ============ */
function FeaturedCollections() {
  const { navigate } = useStore();
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Curated Collections"
          title="House Collections"
          subtitle="Six distinct chapters in the LUXORA story — each crafted to a singular aesthetic."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => navigate("shop", { shopCollection: c.name })}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm text-left"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-[10px] uppercase tracking-luxe text-gold mb-1">{c.tagline}</p>
                <h3 className="font-display text-3xl text-foreground">{c.name}</h3>
                <p className="text-xs text-foreground/70 mt-2 line-clamp-2">{c.description}</p>
                <span className="inline-flex items-center gap-2 mt-4 text-[11px] uppercase tracking-luxe-sm text-foreground group-hover:text-gold transition">
                  Discover
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Shop by Category ============ */
function ShopByCategory() {
  const { navigate } = useStore();
  const cats = [
    { label: "Engagement Rings", cat: "Engagement Rings", icon: Gem },
    { label: "Wedding Bands", cat: "Wedding Bands", icon: Sparkles },
    { label: "Necklaces", cat: "Necklaces", icon: Sparkles },
    { label: "Earrings", cat: "Earrings", icon: Sparkles },
    { label: "Bracelets", cat: "Bracelets", icon: Sparkles },
    { label: "Rings", cat: "Rings", icon: Gem },
  ];
  return (
    <section className="py-20 lg:py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Browse"
          title="Shop by Category"
          subtitle="Explore our collections by what you're searching for."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cats.map((c, i) => (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => navigate("shop", { shopCategory: c.cat })}
              className="group flex flex-col items-center gap-3 p-6 bg-card border border-border hover:border-gold/50 hover:shadow-luxe transition-all rounded-sm"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-onyx transition">
                <c.icon className="w-6 h-6 text-gold group-hover:text-onyx transition" />
              </div>
              <p className="text-xs uppercase tracking-luxe-sm text-center">{c.label}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Loose Diamond Collection ============ */
function LooseDiamondCollection() {
  const { navigate } = useStore();
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="The LUXORA Diamond Vault"
          title="Loose Diamonds"
          subtitle="Every certified diamond in our vault — search by shape, carat, color, clarity and cut."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {DIAMOND_SHAPES.map((s, i) => (
            <motion.button
              key={s.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => navigate("diamonds")}
              className="group relative aspect-square overflow-hidden rounded-sm bg-card border border-border hover:border-gold/50 transition"
            >
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <p className="font-display text-lg text-foreground">{s.name}</p>
                <p className="text-[10px] text-foreground/70 line-clamp-1">{s.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button
            onClick={() => navigate("diamonds")}
            variant="outline"
            className="border-gold/40 text-gold hover:bg-gold hover:text-onyx h-12 px-8 tracking-luxe-sm uppercase text-xs bg-transparent"
          >
            Search 60+ Certified Diamonds <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============ New Arrivals ============ */
function NewArrivals() {
  const products = PRODUCTS.filter((p) => p.badge === "New Arrival").slice(0, 4);
  return (
    <section className="py-20 lg:py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Just Arrived"
          title="New Arrivals"
          subtitle="The latest additions to the LUXORA maison."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Best Sellers ============ */
function BestSellers() {
  const { navigate } = useStore();
  const products = PRODUCTS.filter((p) => p.badge === "Bestseller").slice(0, 8);
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Loved by Clients"
          title="Best Sellers"
          subtitle="Pieces our connoisseurs return for, time and again."
          cta={{ label: "View all", onClick: () => navigate("shop", { shopCategory: "all" }) }}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Bridal Section ============ */
function BridalSection() {
  const { navigate } = useStore();
  return (
    <section className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=2400&q=80"
          alt="Bridal collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-onyx/55" />
      </div>
      <div className="max-w-3xl mx-auto text-center px-6 text-foreground">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-luxe text-gold mb-4"
        >
          The Bridal Edit
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight"
        >
          For the moment
          <br />
          <span className="italic text-gold-gradient">two become one.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-sm md:text-base text-foreground/80 max-w-xl mx-auto"
        >
          Engagement rings and wedding bands crafted to celebrate the
          beginning of forever. Each set is hand-finished, certified, and
          engraved with a private message only you know.
        </motion.p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("shop", { shopCategory: "Engagement Rings" })}
            className="bg-gold text-onyx hover:bg-gold/90 h-12 px-8 tracking-luxe-sm uppercase text-xs"
          >
            Shop Engagement
          </Button>
          <Button
            onClick={() => navigate("shop", { shopCategory: "Wedding Bands" })}
            variant="outline"
            className="border-foreground/30 text-foreground hover:border-gold hover:text-gold h-12 px-8 tracking-luxe-sm uppercase text-xs bg-transparent"
          >
            Shop Wedding Bands
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============ Custom Builder Promo ============ */
function CustomBuilderPromo() {
  const { navigate } = useStore();
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] uppercase tracking-luxe text-gold mb-4">Bespoke</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Design a piece
            <br />
            as unique as
            <br />
            <span className="italic text-gold-gradient">your story.</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-muted-foreground max-w-md">
            Use our Custom Jewelry Builder to choose a certified diamond, pair
            it with a setting, and select your metal — with live pricing and
            3D-style preview. Your design is then crafted to order in Antwerp.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { n: "1", label: "Choose Diamond" },
              { n: "2", label: "Select Setting" },
              { n: "3", label: "Pick Metal" },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-10 h-10 mx-auto rounded-full border border-gold/40 text-gold flex items-center justify-center font-display text-lg">
                  {s.n}
                </div>
                <p className="text-[10px] uppercase tracking-luxe-sm mt-2">{s.label}</p>
              </div>
            ))}
          </div>
          <Button
            onClick={() => navigate("builder")}
            className="mt-8 bg-onyx text-foreground hover:bg-onyx/90 h-12 px-8 tracking-luxe-sm uppercase text-xs"
          >
            Start Designing <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=80"
            alt="Custom jewelry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass-luxe border border-gold/20 p-5 rounded-sm">
            <p className="text-[10px] uppercase tracking-luxe text-gold mb-1">Live Preview</p>
            <p className="font-display text-xl">1.2ct Round · Halo · Platinum</p>
            <p className="text-sm text-foreground/70 mt-1">From $14,800 · GIA Certified</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ Education Preview ============ */
function EducationPreview() {
  const { navigate } = useStore();
  return (
    <section className="py-24 lg:py-32 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Diamond Education"
          title="The 4Cs, Demystified"
          subtitle="Learn the language of diamonds before you invest."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FOUR_CS.map((c, i) => (
            <motion.button
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => navigate("education")}
              className="group text-left p-6 bg-card border border-border hover:border-gold/50 hover:shadow-luxe transition-all rounded-sm"
            >
              <p className="font-display text-5xl text-gold/30 group-hover:text-gold/60 transition">
                {i + 1}
              </p>
              <h3 className="font-display text-2xl mt-2">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.tagline}</p>
              <p className="text-xs text-foreground/70 mt-3 line-clamp-3">{c.description}</p>
            </motion.button>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button
            onClick={() => navigate("education")}
            variant="outline"
            className="border-gold/40 text-gold hover:bg-gold hover:text-onyx h-12 px-8 tracking-luxe-sm uppercase text-xs bg-transparent"
          >
            Enter Education Center <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============ Brand Story ============ */
function BrandStory() {
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-12 h-px bg-gold/60" />
          <Gem className="w-4 h-4 text-gold" />
          <span className="w-12 h-px bg-gold/60" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight"
        >
          A century of light, captured in diamond.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-6 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          Founded in Antwerp in 1924, LUXORA has grown from a small atelier
          into a global maison — yet our philosophy remains unchanged. Every
          diamond is hand-selected, every setting is hand-finished, and every
          piece is backed by a lifetime warranty. We believe luxury is not
          about price; it is about permanence, integrity, and the quiet
          confidence of a thing made well.
        </motion.p>
        <div className="mt-10 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { n: "100+", l: "Years of Craft" },
            { n: "50k+", l: "Diamonds Set" },
            { n: "12", l: "Global Boutiques" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-3xl md:text-4xl text-gold-gradient">{s.n}</p>
              <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Craftsmanship Timeline ============ */
function CraftsmanshipTimeline() {
  const stages = [
    { n: "01", title: "Diamond Selection", desc: "Master gemologists hand-pick each stone from Antwerp's diamond district." },
    { n: "02", title: "Design", desc: "Bespoke designs are sketched and rendered in 3D for client approval." },
    { n: "03", title: "Crafting", desc: "Master jewelers hand-fabricate each setting in 18k gold or platinum." },
    { n: "04", title: "Setting", desc: "Diamonds are precision-set under microscopes to maximize brilliance." },
    { n: "05", title: "Polishing", desc: "Each piece is polished by hand to a mirror finish." },
    { n: "06", title: "Inspection", desc: "Quality is verified by independent gemologists before certification." },
  ];
  return (
    <section className="py-24 lg:py-32 px-6 bg-onyx text-foreground">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="The Atelier"
          title="Craftsmanship, in Six Stages"
          subtitle="From rough diamond to finished heirloom — every step happens under one roof."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group p-7 border border-white/10 hover:border-gold/40 transition rounded-sm bg-white/[0.02]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl text-gold/40 group-hover:text-gold transition">{s.n}</span>
                <div className="w-12 h-px bg-gold/40" />
              </div>
              <h3 className="font-display text-xl">{s.title}</h3>
              <p className="text-sm text-foreground/70 mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Trust & Certifications ============ */
function TrustCertifications() {
  const items = [
    { icon: Shield, title: "GIA & IGI Certified", desc: "Every diamond independently graded" },
    { icon: Award, title: "Lifetime Warranty", desc: "Free repairs & re-polishing for life" },
    { icon: Leaf, title: "Ethically Sourced", desc: "Kimberley Process certified" },
    { icon: Globe, title: "Worldwide Shipping", desc: "Complimentary, fully insured" },
  ];
  return (
    <section className="py-16 px-6 border-y border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <it.icon className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium">{it.title}</p>
              <p className="text-xs text-muted-foreground">{it.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============ Testimonials ============ */
function Testimonials() {
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Client Stories"
          title="Loved Across Continents"
          subtitle="A few words from those who wear LUXORA every day."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="p-7 bg-card border border-border hover:border-gold/30 hover:shadow-luxe transition rounded-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 italic leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold text-xs font-medium">
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-medium">{t.author}</p>
                  <p className="text-[10px] text-muted-foreground">{t.location} · {t.purchaseType}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Instagram Gallery ============ */
function InstagramGallery() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="@luxora.maison"
          title="Worn Around the World"
          subtitle="Tag your LUXORA moments to be featured."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {INSTAGRAM_IMAGES.map((src, i) => (
            <motion.a
              href="#"
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-sm"
            >
              <img
                src={src}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/40 transition flex items-center justify-center">
                <Instagram className="w-5 h-5 text-foreground opacity-0 group-hover:opacity-100 transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* ============ Newsletter ============ */
function NewsletterSection() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-luxe text-gold mb-4">LUXORA Privé</p>
        <h2 className="font-display text-4xl md:text-5xl leading-tight">
          Receive private invitations.
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
          Join our inner circle for early access to new collections, atelier events, and bespoke commissions.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.currentTarget;
            f.reset();
          }}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Your email"
            className="flex-1 bg-background border border-border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/60 transition rounded-sm"
          />
          <button
            type="submit"
            className="bg-gold text-onyx px-6 py-3 text-xs uppercase tracking-luxe-sm font-medium hover:bg-gold/90 transition rounded-sm"
          >
            Join Privé
          </button>
        </form>
        <p className="text-[10px] text-muted-foreground mt-3">
          By joining, you agree to receive marketing emails from LUXORA.
        </p>
      </div>
    </section>
  );
}
