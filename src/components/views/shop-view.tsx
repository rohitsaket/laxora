"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Check, ChevronDown, LayoutGrid, Rows3 } from "lucide-react";
import { PRODUCTS, COLLECTIONS } from "@/lib/data";
import { useStore, formatPrice } from "@/lib/store";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const CATEGORIES = [
  "All",
  "Engagement Rings",
  "Wedding Bands",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
];

const METALS = ["Yellow Gold", "White Gold", "Rose Gold", "Platinum"];
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export function ShopView() {
  const { nav, navigate, currency } = useStore();
  // Derive initial filter values directly from nav (no effect)
  const initialCat =
    nav.shopCategory && nav.shopCategory !== "all" ? nav.shopCategory : "All";
  const initialCollection = nav.shopCollection ?? "All";

  const [category, setCategory] = useState<string>(initialCat);
  const [collection, setCollection] = useState<string>(initialCollection);
  const [metals, setMetals] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);
  const [shapes, setShapes] = useState<string[]>([]);
  const [sort, setSort] = useState("featured");
  const [grid, setGrid] = useState<"large" | "compact">("large");

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (collection !== "All") list = list.filter((p) => p.collection === collection);
    if (metals.length) list = list.filter((p) => p.metals.some((m) => metals.includes(m)));
    if (shapes.length)
      list = list.filter((p) => p.centerStoneShape && shapes.includes(p.centerStoneShape));
    list = list.filter((p) => p.priceUSD >= priceRange[0] && p.priceUSD <= priceRange[1]);

    switch (sort) {
      case "price-asc": list.sort((a, b) => a.priceUSD - b.priceUSD); break;
      case "price-desc": list.sort((a, b) => b.priceUSD - a.priceUSD); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => (b.badge === "New Arrival" ? 1 : 0) - (a.badge === "New Arrival" ? 1 : 0)); break;
    }
    return list;
  }, [category, collection, metals, shapes, priceRange, sort]);

  const toggle = (arr: string[], v: string, setter: (a: string[]) => void) =>
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const title = collection !== "All" ? collection : category === "All" ? "All Jewelry" : category;

  const FiltersContent = (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Category</p>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex items-center justify-between w-full text-sm py-1 ${
                category === c ? "text-gold" : "hover:text-foreground"
              }`}
            >
              {c}
              {category === c && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Collection</p>
        <div className="space-y-2">
          <button
            onClick={() => setCollection("All")}
            className={`block text-sm py-1 ${collection === "All" ? "text-gold" : "hover:text-foreground"}`}
          >
            All Collections
          </button>
          {COLLECTIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCollection(c.name)}
              className={`block text-sm py-1 ${collection === c.name ? "text-gold" : "hover:text-foreground"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">
          Price · {formatPrice(priceRange[0], currency)} – {formatPrice(priceRange[1], currency)}
        </p>
        <Slider
          min={0}
          max={25000}
          step={500}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          className="mt-3"
        />
      </div>

      <Separator />

      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Metal</p>
        <div className="space-y-2.5">
          {METALS.map((m) => (
            <label key={m} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={metals.includes(m)}
                onCheckedChange={() => toggle(metals, m, setMetals)}
              />
              <span className="text-sm">{m}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Center Stone Shape</p>
        <div className="grid grid-cols-2 gap-2.5">
          {["Round", "Oval", "Princess", "Emerald", "Cushion", "Pear"].map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={shapes.includes(s)}
                onCheckedChange={() => toggle(shapes, s, setShapes)}
              />
              <span className="text-sm">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setMetals([]);
          setShapes([]);
          setPriceRange([0, 25000]);
          setCategory("All");
          setCollection("All");
        }}
      >
        Clear all filters
      </Button>
    </div>
  );

  return (
    <div className="py-10 lg:py-14">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">LUXORA · Collection</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">{title}</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            {filtered.length} piece{filtered.length === 1 ? "" : "s"} · ethically sourced, master crafted, certified
          </p>
        </motion.div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 sticky top-16 lg:top-20 z-30 bg-background/80 backdrop-blur py-3 border-y border-border">
          <div className="flex items-center gap-3">
            {/* Mobile filter trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden h-9">
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-display text-2xl">Filters</SheetTitle>
                </SheetHeader>
                <div className="px-6 pb-6">{FiltersContent}</div>
              </SheetContent>
            </Sheet>

            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant={grid === "large" ? "default" : "ghost"}
                size="icon"
                className="h-9 w-9"
                onClick={() => setGrid("large")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={grid === "compact" ? "default" : "ghost"}
                size="icon"
                className="h-9 w-9"
                onClick={() => setGrid("compact")}
              >
                <Rows3 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-muted-foreground">Sort by</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-background border border-border text-xs pl-3 pr-8 py-2 rounded-sm focus:outline-none focus:border-gold/60"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Grid + sidebar */}
        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-40">{FiltersContent}</div>
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-display text-2xl">No pieces match your filters.</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your selection.</p>
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-5 lg:gap-8 ${
                  grid === "large"
                    ? "grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-2 lg:grid-cols-4"
                }`}
              >
                <AnimatePresence>
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={p} index={i} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
