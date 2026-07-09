"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Gem, ArrowUpDown, Heart, ShoppingBag, X, Check } from "lucide-react";
import { DIAMONDS } from "@/lib/data";
import { useStore, formatPrice } from "@/lib/store";
import type { DiamondShape, DiamondColor, DiamondClarity, DiamondCut } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

const SHAPES: DiamondShape[] = ["Round", "Princess", "Oval", "Emerald", "Cushion", "Pear", "Radiant", "Marquise", "Asscher", "Heart"];
const COLORS: DiamondColor[] = ["D", "E", "F", "G", "H", "I", "J"];
const CLARITIES: DiamondClarity[] = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];
const CUTS: DiamondCut[] = ["Excellent", "Very Good", "Good"];
const CERTS = ["GIA", "IGI", "HRD", "AGS"];

export function DiamondSearchView() {
  const { addToCart, toggleWishlist, wishlist, navigate, currency } = useStore();
  const [shapes, setShapes] = useState<string[]>([]);
  const [caratRange, setCaratRange] = useState<[number, number]>([0.3, 4]);
  const [colors, setColors] = useState<string[]>([]);
  const [clarities, setClarities] = useState<string[]>([]);
  const [cuts, setCuts] = useState<string[]>([]);
  const [certs, setCerts] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 60000]);
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "carat-desc">("price-asc");
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (arr: string[], v: string, setter: (a: string[]) => void) =>
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let list = DIAMONDS.filter((d) => {
      if (shapes.length && !shapes.includes(d.shape)) return false;
      if (d.carat < caratRange[0] || d.carat > caratRange[1]) return false;
      if (colors.length && !colors.includes(d.color)) return false;
      if (clarities.length && !clarities.includes(d.clarity)) return false;
      if (cuts.length && !cuts.includes(d.cut)) return false;
      if (certs.length && !certs.includes(d.certificate)) return false;
      if (d.priceUSD < priceRange[0] || d.priceUSD > priceRange[1]) return false;
      return true;
    });
    if (sort === "price-asc") list.sort((a, b) => a.priceUSD - b.priceUSD);
    else if (sort === "price-desc") list.sort((a, b) => b.priceUSD - a.priceUSD);
    else list.sort((a, b) => b.carat - a.carat);
    return list;
  }, [shapes, caratRange, colors, clarities, cuts, certs, priceRange, sort]);

  const selectedDiamond = filtered.find((d) => d.id === selected) ?? null;

  const Filters = (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Shape</p>
        <div className="grid grid-cols-3 gap-2">
          {SHAPES.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={shapes.includes(s)}
                onCheckedChange={() => toggle(shapes, s, setShapes)}
              />
              <span className="text-xs">{s}</span>
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">
          Carat · {caratRange[0]}ct – {caratRange[1]}ct
        </p>
        <Slider
          min={0.3}
          max={4}
          step={0.1}
          value={caratRange}
          onValueChange={(v) => setCaratRange(v as [number, number])}
        />
      </div>
      <Separator />
      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Color</p>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => toggle(colors, c, setColors)}
              className={`w-9 h-9 rounded-full text-xs font-medium border transition ${
                colors.includes(c) ? "bg-gold text-onyx border-gold" : "border-border hover:border-foreground/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Clarity</p>
        <div className="flex flex-wrap gap-2">
          {CLARITIES.map((c) => (
            <button
              key={c}
              onClick={() => toggle(clarities, c, setClarities)}
              className={`px-3 h-9 rounded-sm text-xs font-medium border transition ${
                clarities.includes(c) ? "bg-gold text-onyx border-gold" : "border-border hover:border-foreground/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Cut</p>
        <div className="space-y-2">
          {CUTS.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={cuts.includes(c)} onCheckedChange={() => toggle(cuts, c, setCuts)} />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Certification</p>
        <div className="flex flex-wrap gap-2">
          {CERTS.map((c) => (
            <button
              key={c}
              onClick={() => toggle(certs, c, setCerts)}
              className={`px-3 h-8 rounded-sm text-xs border transition ${
                certs.includes(c) ? "bg-gold text-onyx border-gold" : "border-border hover:border-foreground/40"
              }`}
            >
              {c}
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
          max={60000}
          step={500}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
        />
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setShapes([]); setColors([]); setClarities([]); setCuts([]); setCerts([]);
          setCaratRange([0.3, 4]); setPriceRange([0, 60000]);
        }}
      >
        Reset all filters
      </Button>
    </div>
  );

  return (
    <div className="py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">LUXORA Diamond Vault</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">Loose Diamonds</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            {filtered.length} certified diamonds · independently graded · ethically sourced
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-32">{Filters}</div>
          </aside>

          <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto">
                  <SheetHeader><SheetTitle className="font-display text-2xl">Filters</SheetTitle></SheetHeader>
                  <div className="px-6 pb-6">{Filters}</div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2 ml-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="bg-background border border-border text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold/60"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="carat-desc">Carat: High to Low</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-border rounded-sm">
              <table className="w-full text-xs">
                <thead className="bg-secondary/40">
                  <tr className="text-left">
                    <th className="py-3 px-3 font-medium uppercase tracking-luxe-sm text-muted-foreground">Shape</th>
                    <th className="py-3 px-3 font-medium uppercase tracking-luxe-sm text-muted-foreground">Carat</th>
                    <th className="py-3 px-3 font-medium uppercase tracking-luxe-sm text-muted-foreground">Color</th>
                    <th className="py-3 px-3 font-medium uppercase tracking-luxe-sm text-muted-foreground">Clarity</th>
                    <th className="py-3 px-3 font-medium uppercase tracking-luxe-sm text-muted-foreground">Cut</th>
                    <th className="py-3 px-3 font-medium uppercase tracking-luxe-sm text-muted-foreground hidden md:table-cell">Cert</th>
                    <th className="py-3 px-3 font-medium uppercase tracking-luxe-sm text-muted-foreground text-right">Price</th>
                    <th className="py-3 px-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 30).map((d, i) => (
                    <motion.tr
                      key={d.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: Math.min(i * 0.02, 0.4) }}
                      className="border-t border-border hover:bg-secondary/30 transition cursor-pointer"
                      onClick={() => setSelected(d.id)}
                    >
                      <td className="py-3 px-3 font-medium">{d.shape}</td>
                      <td className="py-3 px-3">{d.carat.toFixed(2)}</td>
                      <td className="py-3 px-3">{d.color}</td>
                      <td className="py-3 px-3">{d.clarity}</td>
                      <td className="py-3 px-3">{d.cut}</td>
                      <td className="py-3 px-3 hidden md:table-cell">
                        <Badge variant="secondary" className="text-[9px] bg-gold/15 text-gold border border-gold/30">
                          {d.certificate}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right font-medium">{formatPrice(d.priceUSD, currency)}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(d.id);
                            toast("Wishlist updated");
                          }}
                          className="p-1.5 hover:text-gold"
                        >
                          <Heart className={`w-3.5 h-3.5 ${wishlist.includes(d.id) ? "fill-gold text-gold" : ""}`} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length > 30 && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                Showing 30 of {filtered.length} diamonds. Refine filters to see more.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Diamond detail modal */}
      {selectedDiamond && (
        <div
          className="fixed inset-0 bg-onyx/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-border rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-square bg-muted">
                <img src={selectedDiamond.image} alt={selectedDiamond.shape} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe text-gold">Stock {selectedDiamond.stock}</p>
                    <h2 className="font-display text-3xl mt-1">
                      {selectedDiamond.carat.toFixed(2)}ct {selectedDiamond.shape}
                    </h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs my-5">
                  {[
                    ["Color", selectedDiamond.color],
                    ["Clarity", selectedDiamond.clarity],
                    ["Cut", selectedDiamond.cut],
                    ["Polish", selectedDiamond.polish],
                    ["Symmetry", selectedDiamond.symmetry],
                    ["Fluorescence", selectedDiamond.fluorescence],
                    ["Table", `${selectedDiamond.tablePercent}%`],
                    ["Depth", `${selectedDiamond.depthPercent}%`],
                    ["Length", `${selectedDiamond.lengthMM}mm`],
                    ["Width", `${selectedDiamond.widthMM}mm`],
                    ["Ratio", selectedDiamond.ratio.toFixed(2)],
                    ["Certificate", selectedDiamond.certificate],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-border py-1.5">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>

                <p className="font-display text-3xl text-gold mb-4">{formatPrice(selectedDiamond.priceUSD, currency)}</p>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gold text-onyx hover:bg-gold/90 h-11"
                    onClick={() => {
                      addToCart({
                        productId: selectedDiamond.id,
                        name: `${selectedDiamond.carat.toFixed(2)}ct ${selectedDiamond.shape} ${selectedDiamond.color} ${selectedDiamond.clarity}`,
                        image: selectedDiamond.image,
                        carat: selectedDiamond.carat,
                        priceUSD: selectedDiamond.priceUSD,
                        type: "diamond",
                      });
                      toast.success("Diamond added to bag");
                      setSelected(null);
                    }}
                  >
                    <ShoppingBag className="w-4 h-4 mr-1" /> Add to Bag
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("builder");
                      setSelected(null);
                    }}
                  >
                    <Gem className="w-4 h-4 mr-1" /> Set in Ring
                  </Button>
                </div>

                <p className="text-[10px] text-muted-foreground mt-4 flex items-center gap-1">
                  <Check className="w-3 h-3 text-gold" />
                  Independently certified by {selectedDiamond.certificate} · Certificate ID: {selectedDiamond.certificateId}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
