"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Sparkles,
  Gem,
} from "lucide-react";
import { useStore, formatPrice, type ViewName } from "@/lib/store";
import { PRODUCTS, COLLECTIONS } from "@/lib/data";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "./cart-drawer";

const navItems: { label: string; view: ViewName; mega?: boolean }[] = [
  { label: "Engagement", view: "shop", mega: true },
  { label: "Jewelry", view: "shop", mega: true },
  { label: "Diamonds", view: "diamonds" },
  { label: "Custom Builder", view: "builder" },
  { label: "Education", view: "education" },
  { label: "Appointments", view: "appointments" },
];

export function Header() {
  const { navigate, wishlist, cart, setMobileMenuOpen, mobileMenuOpen, searchOpen, setSearchOpen, setAuthModalOpen, auth, currency, setCurrency } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMega, hoverMega] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  // Set mounted on the next tick (avoid setState-in-effect lint rule)
  useEffect(() => {
    // useAnimationFrame to defer the state update out of the effect body
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = cart.reduce((n, c) => n + c.qty, 0);
  const subtotal = useStore((s) => s.cartSubtotal());

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q") as string;
    if (q.trim()) {
      navigate("shop", { shopCategory: q.trim() });
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-luxe border-b border-border/60 shadow-luxe"
            : "bg-transparent border-b border-transparent"
        }`}
        onMouseLeave={() => hoverMega(null)}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            {/* Left: mobile menu + logo */}
            <div className="flex items-center gap-2 lg:gap-3 flex-1 lg:flex-none">
              <button
                aria-label="Open menu"
                className="lg:hidden p-1.5 -ml-1.5"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("home")}
                className="flex items-center gap-2 group"
                aria-label="LUXORA home"
              >
                <span className="font-display text-2xl lg:text-3xl tracking-luxe">
                  LUXORA
                </span>
                <Gem className="w-4 h-4 text-gold hidden sm:block transition-transform group-hover:rotate-12" />
              </button>
            </div>

            {/* Center: nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-luxe-sm uppercase">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  onMouseEnter={() => hoverMega(item.mega ? item.label : null)}
                  className="relative py-2"
                >
                  <button
                    onClick={() => navigate(item.view, item.label === "Engagement" ? { shopCategory: "Engagement Rings" } : item.label === "Jewelry" ? { shopCategory: "all" } : undefined)}
                    className="luxury-underline text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {item.label}
                    {item.mega && <ChevronDown className="w-3 h-3 opacity-60" />}
                  </button>
                </div>
              ))}
            </nav>

            {/* Right: actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-1 lg:flex-none justify-end">
              <button
                aria-label="Search"
                className="p-2 hover:text-gold transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              {/* Currency */}
              <div className="relative hidden sm:block">
                <button
                  aria-label="Change currency"
                  className="p-2 hover:text-gold transition-colors flex items-center gap-1 text-xs"
                  onClick={() => setCurrencyOpen((o) => !o)}
                >
                  <Globe className="w-[18px] h-[18px]" />
                  <span className="hidden md:inline">{currency}</span>
                </button>
                {currencyOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-32 bg-popover border border-border rounded-md shadow-luxe py-1 z-50"
                    onMouseLeave={() => setCurrencyOpen(false)}
                  >
                    {(["USD", "EUR", "GBP", "INR"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrency(c);
                          setCurrencyOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-accent/40 ${
                          currency === c ? "text-gold" : ""
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme */}
              {mounted && (
                <button
                  aria-label="Toggle theme"
                  className="p-2 hover:text-gold transition-colors"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </button>
              )}

              <button
                aria-label="Wishlist"
                className="p-2 hover:text-gold transition-colors relative"
                onClick={() => navigate("wishlist")}
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-onyx text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <CartDrawer>
                <button
                  aria-label="Cart"
                  className="p-2 hover:text-gold transition-colors relative"
                >
                  <ShoppingBag className="w-[18px] h-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-gold text-onyx text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </CartDrawer>

              <button
                aria-label="Account"
                className="p-2 hover:text-gold transition-colors"
                onClick={() => (auth.user ? navigate("account") : setAuthModalOpen(true))}
              >
                <User className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {hoveredMega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 right-0 top-full hidden lg:block"
              onMouseEnter={() => hoverMega(hoveredMega)}
            >
              <MegaMenu section={hoveredMega} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="p-0 max-w-2xl overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Search LUXORA</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSearch} className="flex items-center gap-3 p-6 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              name="q"
              autoFocus
              placeholder="Search rings, diamonds, collections…"
              className="border-0 focus-visible:ring-0 text-base px-0 h-auto"
            />
            <Button type="submit" size="sm" className="bg-gold text-onyx hover:bg-gold/90">
              Search
            </Button>
          </form>
          <div className="p-6">
            <p className="text-xs uppercase tracking-luxe-sm text-muted-foreground mb-3">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {["Engagement Rings", "Round 1ct", "Tennis Bracelet", "Céleste", "Halo", "Platinum"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    navigate("shop", { shopCategory: t });
                    setSearchOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs border border-border rounded-full hover:border-gold hover:text-gold transition"
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-luxe-sm text-muted-foreground mb-3">Featured</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      navigate("product", { productId: p.id });
                      setSearchOpen(false);
                    }}
                    className="group text-left"
                  >
                    <div className="aspect-square overflow-hidden bg-muted rounded-sm mb-2">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <p className="text-xs font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(p.priceUSD, currency)}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[88vw] max-w-sm p-0">
          <SheetHeader className="p-6 border-b border-border">
            <SheetTitle className="font-display text-2xl tracking-luxe text-left">LUXORA</SheetTitle>
          </SheetHeader>
          <div className="px-6 py-4 overflow-y-auto max-h-[80vh]">
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-2 mt-2">Shop</p>
            <div className="space-y-1 mb-6">
              {[
                { label: "All Jewelry", view: "shop" as ViewName, opts: { shopCategory: "all" } },
                { label: "Engagement Rings", view: "shop" as ViewName, opts: { shopCategory: "Engagement Rings" } },
                { label: "Wedding Bands", view: "shop" as ViewName, opts: { shopCategory: "Wedding Bands" } },
                { label: "Necklaces", view: "shop" as ViewName, opts: { shopCategory: "Necklaces" } },
                { label: "Earrings", view: "shop" as ViewName, opts: { shopCategory: "Earrings" } },
                { label: "Bracelets", view: "shop" as ViewName, opts: { shopCategory: "Bracelets" } },
              ].map((i) => (
                <button
                  key={i.label}
                  className="block w-full text-left py-2 text-sm hover:text-gold"
                  onClick={() => navigate(i.view, i.opts)}
                >
                  {i.label}
                </button>
              ))}
            </div>

            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Collections</p>
            <div className="space-y-1 mb-6">
              {COLLECTIONS.map((c) => (
                <button
                  key={c.id}
                  className="block w-full text-left py-2 text-sm hover:text-gold"
                  onClick={() => navigate("shop", { shopCollection: c.name })}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Experience</p>
            <div className="space-y-1 mb-6">
              <button className="block w-full text-left py-2 text-sm hover:text-gold" onClick={() => navigate("diamonds")}>
                Loose Diamonds
              </button>
              <button className="block w-full text-left py-2 text-sm hover:text-gold" onClick={() => navigate("builder")}>
                Custom Jewelry Builder
              </button>
              <button className="block w-full text-left py-2 text-sm hover:text-gold" onClick={() => navigate("education")}>
                Diamond Education
              </button>
              <button className="block w-full text-left py-2 text-sm hover:text-gold" onClick={() => navigate("appointments")}>
                Book Appointment
              </button>
              <button className="block w-full text-left py-2 text-sm hover:text-gold" onClick={() => navigate("account")}>
                My Account
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function MegaMenu({ section }: { section: string }) {
  const { navigate } = useStore();
  if (section === "Engagement") {
    const cats = [
      { label: "Solitaires", cat: "Engagement Rings", img: PRODUCTS[0].images[0] },
      { label: "Halo Rings", cat: "Engagement Rings", img: PRODUCTS[1].images[0] },
      { label: "Three-Stone", cat: "Engagement Rings", img: PRODUCTS[2].images[0] },
      { label: "Bridal Sets", cat: "Engagement Rings", img: PRODUCTS[4].images[0] },
    ];
    return (
      <div className="bg-popover/95 glass-luxe border-t border-border/60 shadow-luxe">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-5 gap-6">
          <div className="col-span-1">
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-3">Categories</p>
            <div className="space-y-1.5 text-sm">
              <button className="block hover:text-gold" onClick={() => navigate("shop", { shopCategory: "Engagement Rings" })}>All Engagement</button>
              <button className="block hover:text-gold" onClick={() => navigate("shop", { shopCategory: "Wedding Bands" })}>Wedding Bands</button>
              <button className="block hover:text-gold" onClick={() => navigate("builder")}>Build Your Own</button>
              <button className="block hover:text-gold" onClick={() => navigate("diamonds")}>Loose Diamonds</button>
            </div>
          </div>
          <div className="col-span-4 grid grid-cols-4 gap-4">
            {cats.map((c) => (
              <button
                key={c.label}
                onClick={() => navigate("shop", { shopCategory: c.cat })}
                className="group text-left"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted rounded-sm mb-2">
                  <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-xs font-medium">{c.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  // Jewelry mega
  const cats = [
    { label: "Rings", cat: "Rings", img: PRODUCTS[13].images[0] },
    { label: "Necklaces", cat: "Necklaces", img: PRODUCTS[15].images[0] },
    { label: "Earrings", cat: "Earrings", img: PRODUCTS[20].images[0] },
    { label: "Bracelets", cat: "Bracelets", img: PRODUCTS[25].images[0] },
  ];
  return (
    <div className="bg-popover/95 glass-luxe border-t border-border/60 shadow-luxe">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-5 gap-6">
        <div className="col-span-1">
          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-3">Collections</p>
          <div className="space-y-1.5 text-sm">
            {COLLECTIONS.map((c) => (
              <button
                key={c.id}
                className="block hover:text-gold"
                onClick={() => navigate("shop", { shopCollection: c.name })}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-4 grid grid-cols-4 gap-4">
          {cats.map((c) => (
            <button
              key={c.label}
              onClick={() => navigate("shop", { shopCategory: c.cat })}
              className="group text-left"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted rounded-sm mb-2">
                <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-xs font-medium">{c.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
