"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Gem,
  Award,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  Check,
  ArrowLeft,
} from "lucide-react";
import { PRODUCTS, reviewsFor } from "@/lib/data";
import { useStore, formatPrice } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/shared/product-card";
import { toast } from "sonner";

export function ProductDetailView() {
  const { nav, navigate, addToCart, toggleWishlist, isWishlisted, pushRecentlyViewed, currency } = useStore();
  const product = PRODUCTS.find((p) => p.id === nav.productId) ?? PRODUCTS[0];
  const [activeImg, setActiveImg] = useState(0);
  const [metal, setMetal] = useState(product.metals[0]);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    pushRecentlyViewed(product.id);
    // Defer state resets to avoid cascading renders in effect body
    const id = requestAnimationFrame(() => {
      setActiveImg(0);
      setMetal(product.metals[0]);
      setQty(1);
      setZoom(false);
    });
    return () => cancelAnimationFrame(id);
  }, [product.id]);

  const wished = isWishlisted(product.id);
  const reviews = useMemo(() => reviewsFor(product.id, 5), [product.id]);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const variant = product.variants?.find((v) => v.metal === metal) ?? product.variants?.[0];
  const price = variant?.priceUSD ?? product.priceUSD;

  const onAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      metal,
      carat: product.caratWeight,
      priceUSD: price,
      type: "jewelry",
      qty,
    });
    toast.success(`${product.name} added to bag`);
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <button onClick={() => navigate("home")} className="hover:text-foreground">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate("shop", { shopCategory: product.category })} className="hover:text-foreground">
            {product.category}
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <button
          onClick={() => navigate("shop", { shopCategory: product.category })}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {product.category}
        </button>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div
              className="relative aspect-square overflow-hidden bg-muted rounded-sm cursor-zoom-in"
              onClick={() => setZoom((z) => !z)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={product.images[activeImg]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    zoom ? "scale-150" : "scale-100"
                  }`}
                />
              </AnimatePresence>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gold text-onyx text-[10px] tracking-luxe-sm uppercase">
                    {product.badge}
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-background/70 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-luxe-sm rounded-sm">
                Click to zoom
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden rounded-sm border-2 transition ${
                    activeImg === i ? "border-gold" : "border-transparent hover:border-border"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">{product.collection} Collection</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} · {product.reviewsCount} reviews
              </span>
            </div>

            <div className="flex items-end gap-3 mt-5">
              <span className="font-display text-3xl">{formatPrice(price, currency)}</span>
              {product.compareAtUSD && (
                <span className="text-sm text-muted-foreground line-through mb-1">
                  {formatPrice(product.compareAtUSD, currency)}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Or 4 interest-free payments of {formatPrice(price / 4, currency)} · Lifetime warranty</p>

            <Separator className="my-6" />

            <p className="text-sm text-foreground/80 leading-relaxed">{product.description}</p>

            {/* Metal selector */}
            <div className="mt-7">
              <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">
                Metal: <span className="text-foreground">{metal}</span>
              </p>
              <div className="flex gap-2.5">
                {product.metals.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetal(m)}
                    className={`px-4 py-2.5 text-xs border rounded-sm transition ${
                      metal === m
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + actions */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border border-border rounded-sm h-12">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 h-full hover:bg-accent/40"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 h-full hover:bg-accent/40"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <Button
                onClick={onAddToCart}
                className="flex-1 bg-gold text-onyx hover:bg-gold/90 h-12 tracking-luxe-sm uppercase text-xs"
              >
                <ShoppingBag className="w-4 h-4 mr-2" /> Add to Bag · {formatPrice(price * qty, currency)}
              </Button>
              <Button
                onClick={() => {
                  toggleWishlist(product.id);
                  toast(wished ? "Removed from wishlist" : "Added to wishlist");
                }}
                variant="outline"
                className="h-12 px-4 border-border hover:border-gold hover:text-gold"
              >
                <Heart className={`w-4 h-4 ${wished ? "fill-gold text-gold" : ""}`} />
              </Button>
            </div>

            <Button
              onClick={() => navigate("builder")}
              variant="ghost"
              className="mt-3 text-xs tracking-luxe-sm uppercase hover:text-gold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Build a similar custom design
            </Button>

            {/* Trust */}
            <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
              {[
                { icon: Truck, label: "Free worldwide shipping" },
                { icon: RotateCcw, label: "30-day returns" },
                { icon: Shield, label: "Lifetime warranty" },
                { icon: Award, label: "GIA / IGI certified" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 p-3 border border-border rounded-sm">
                  <t.icon className="w-4 h-4 text-gold" />
                  {t.label}
                </div>
              ))}
            </div>

            {/* Quick features */}
            <ul className="mt-6 space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                  <Check className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Tabs */}
            <Tabs defaultValue="specs" className="mt-10">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
                {["specs", "shipping", "reviews"].map((t) => (
                  <TabsTrigger
                    key={t}
                    value={t}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent text-xs uppercase tracking-luxe-sm pb-3 pt-2"
                  >
                    {t === "specs" ? "Specifications" : t === "shipping" ? "Shipping & Returns" : `Reviews (${reviews.length})`}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="specs" className="mt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    ["Collection", product.collection],
                    ["Category", product.category],
                    ["Center Stone", product.centerStoneShape ?? "Diamond"],
                    ["Total Carat Weight", `${product.caratWeight} ct`],
                    ["Metal Options", product.metals.join(", ")],
                    ["Certification", product.certificate ?? "GIA"],
                    ["Stock ID", product.id.toUpperCase()],
                    ["Warranty", "Lifetime"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5 border-b border-border py-2">
                      <span className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">{k}</span>
                      <span className="text-sm">{v}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6 space-y-4 text-sm text-foreground/80 leading-relaxed">
                <p>
                  <strong className="text-foreground">Complimentary Worldwide Shipping.</strong> All LUXORA pieces are
                  shipped fully insured via FedEx Priority, arriving in 2–5 business days. Each shipment requires an
                  adult signature.
                </p>
                <p>
                  <strong className="text-foreground">30-Day Returns.</strong> If your piece does not exceed expectations,
                  return it within 30 days for a full refund. Custom and engraved pieces are final sale.
                </p>
                <p>
                  <strong className="text-foreground">Lifetime Warranty.</strong> Every LUXORA piece is covered for life
                  against manufacturing defects. Complimentary re-polishing and prong tightening included.
                </p>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-5">
                <div className="flex items-center gap-6 p-5 bg-secondary/30 rounded-sm">
                  <div className="text-center">
                    <p className="font-display text-4xl text-gold">{product.rating.toFixed(1)}</p>
                    <div className="flex gap-0.5 mt-1 justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-muted"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{product.reviewsCount} reviews</p>
                  </div>
                  <Separator orientation="vertical" className="h-16" />
                  <p className="text-xs text-muted-foreground flex-1">
                    Verified buyers share their experience with this piece. Reviews are moderated to ensure authenticity.
                  </p>
                </div>

                {reviews.map((r) => (
                  <div key={r.id} className="border-b border-border pb-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold text-xs font-medium">
                          {r.author.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{r.author}</p>
                          <p className="text-[10px] text-muted-foreground">{r.location} · {new Date(r.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-gold text-gold" : "text-muted"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="font-medium text-sm mt-3">{r.title}</p>
                    <p className="text-sm text-foreground/80 mt-1.5 leading-relaxed">{r.body}</p>
                    <div className="flex items-center gap-3 mt-3 text-[10px]">
                      {r.verifiedBuyer && (
                        <Badge variant="secondary" className="text-[9px] bg-gold/15 text-gold border border-gold/30">
                          Verified Buyer
                        </Badge>
                      )}
                      <span className="text-muted-foreground">Purchase: {r.purchaseType}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{r.helpful} found this helpful</span>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related */}
        <section className="mt-24">
          <h2 className="font-display text-3xl text-center mb-10">You May Also Love</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
