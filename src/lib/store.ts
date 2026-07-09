"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { JewelryProduct, LooseDiamond } from "./types";

export type ViewName =
  | "home"
  | "shop"
  | "product"
  | "diamonds"
  | "diamond-detail"
  | "cart"
  | "checkout"
  | "wishlist"
  | "account"
  | "builder"
  | "appointments"
  | "education"
  | "auth"
  | "search";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  metal?: string;
  carat?: number;
  priceUSD: number;
  qty: number;
  type: "jewelry" | "diamond" | "custom";
  giftWrap?: boolean;
  insurance?: boolean;
}

export interface BuilderState {
  step: 1 | 2 | 3;
  shape: string | null;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  setting: "Solitaire" | "Halo" | "Three-Stone" | "Pavé" | "Bezel";
  metal: "Yellow Gold" | "White Gold" | "Rose Gold" | "Platinum";
  engraving: string;
}

export interface NavState {
  view: ViewName;
  productId?: string;
  diamondId?: string;
  shopCategory?: string;
  shopCollection?: string;
}

interface AuthUser {
  name: string;
  email: string;
  initials: string;
  loyaltyTier: "Silver" | "Gold" | "Platinum" | "Diamond";
  loyaltyPoints: number;
}

interface AppState {
  // Navigation
  nav: NavState;
  navigate: (view: ViewName, opts?: Partial<Omit<NavState, "view">>) => void;

  // UI
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  aiChatOpen: boolean;
  setAiChatOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "qty"> & { qty?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  toggleGiftWrap: (id: string) => void;
  toggleInsurance: (id: string) => void;
  clearCart: () => void;
  cartSubtotal: () => number;

  // Wishlist
  wishlist: string[]; // productIds
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Recently viewed
  recentlyViewed: string[];
  pushRecentlyViewed: (productId: string) => void;

  // Auth (mock)
  auth: { user: AuthUser | null };
  signIn: (email: string, name: string) => void;
  signOut: () => void;

  // Builder
  builder: BuilderState;
  setBuilder: (partial: Partial<BuilderState>) => void;
  resetBuilder: () => void;
  builderPrice: () => number;

  // Currency / locale
  currency: "USD" | "EUR" | "GBP" | "INR";
  setCurrency: (c: AppState["currency"]) => void;

  // Hydration
  _hydrated: boolean;
  hydrate: () => void;
}

const initialBuilder: BuilderState = {
  step: 1,
  shape: "Round",
  carat: 1.0,
  color: "F",
  clarity: "VS1",
  cut: "Excellent",
  setting: "Solitaire",
  metal: "White Gold",
  engraving: "",
};

const metalMult: Record<string, number> = {
  "Yellow Gold": 1,
  "White Gold": 1.05,
  "Rose Gold": 1.05,
  Platinum: 1.35,
};
const settingBase: Record<string, number> = {
  Solitaire: 1800,
  Halo: 3200,
  "Three-Stone": 4200,
  Pavé: 3600,
  Bezel: 2200,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      nav: { view: "home" },
      navigate: (view, opts) => {
        set({ nav: { view, ...opts }, mobileMenuOpen: false, searchOpen: false });
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },

      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      authModalOpen: false,
      setAuthModalOpen: (open) => set({ authModalOpen: open }),
      aiChatOpen: false,
      setAiChatOpen: (open) => set({ aiChatOpen: open }),

      cart: [],
      addToCart: (item) =>
        set((s) => {
          const existing = s.cart.find(
            (c) =>
              c.productId === item.productId &&
              c.metal === item.metal &&
              c.type === item.type
          );
          if (existing) {
            return {
              cart: s.cart.map((c) =>
                c.id === existing.id ? { ...c, qty: c.qty + (item.qty ?? 1) } : c
              ),
            };
          }
          const id = `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
          return { cart: [...s.cart, { ...item, id, qty: item.qty ?? 1 }] };
        }),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          cart: s.cart.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c)),
        })),
      toggleGiftWrap: (id) =>
        set((s) => ({
          cart: s.cart.map((c) => (c.id === id ? { ...c, giftWrap: !c.giftWrap } : c)),
        })),
      toggleInsurance: (id) =>
        set((s) => ({
          cart: s.cart.map((c) => (c.id === id ? { ...c, insurance: !c.insurance } : c)),
        })),
      clearCart: () => set({ cart: [] }),
      cartSubtotal: () => {
        const cart = get().cart;
        return cart.reduce((sum, c) => {
          let line = c.priceUSD * c.qty;
          if (c.giftWrap) line += 35 * c.qty;
          if (c.insurance) line += Math.round(c.priceUSD * 0.015) * c.qty;
          return sum + line;
        }, 0);
      },

      wishlist: [],
      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),
      isWishlisted: (productId) => get().wishlist.includes(productId),

      recentlyViewed: [],
      pushRecentlyViewed: (productId) =>
        set((s) => ({
          recentlyViewed: [productId, ...s.recentlyViewed.filter((id) => id !== productId)].slice(0, 8),
        })),

      auth: { user: null },
      signIn: (email, name) => {
        const initials = name
          .split(" ")
          .map((p) => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        set({ auth: { user: { email, name, initials, loyaltyTier: "Gold", loyaltyPoints: 1250 } } });
      },
      signOut: () => set({ auth: { user: null } }),

      builder: initialBuilder,
      setBuilder: (partial) => set((s) => ({ builder: { ...s.builder, ...partial } })),
      resetBuilder: () => set({ builder: initialBuilder }),
      builderPrice: () => {
        const b = get().builder;
        // rough carat price
        const caratPrice = 5500 * b.carat * b.carat;
        const colorMult = 1.4 - (["D", "E", "F", "G", "H", "I", "J"].indexOf(b.color) ?? 4) * 0.05;
        const clarityMult =
          2.0 - (["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"].indexOf(b.clarity) ?? 4) * 0.12;
        const cutMult = b.cut === "Excellent" ? 1.15 : b.cut === "Very Good" ? 1.0 : 0.88;
        const setting = settingBase[b.setting] ?? 2200;
        const metal = metalMult[b.metal] ?? 1;
        const engrave = b.engraving ? 75 : 0;
        return Math.round((caratPrice * colorMult * clarityMult * cutMult + setting * metal + engrave) / 10) * 10;
      },

      currency: "USD",
      setCurrency: (c) => set({ currency: c }),

      _hydrated: false,
      hydrate: () => set({ _hydrated: true }),
    }),
    {
      name: "luxora-state",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (undefined as any))),
      partialize: (s) => ({
        cart: s.cart,
        wishlist: s.wishlist,
        recentlyViewed: s.recentlyViewed,
        auth: s.auth,
        currency: s.currency,
        builder: s.builder,
      }),
    }
  )
);

// Selector helper to silence unused-import warnings
export const useStoreSelector = <T,>(selector: (s: AppState) => T): T => useStore(selector);

// Currency formatting
const RATES: Record<string, { rate: number; symbol: string }> = {
  USD: { rate: 1, symbol: "$" },
  EUR: { rate: 0.92, symbol: "€" },
  GBP: { rate: 0.79, symbol: "£" },
  INR: { rate: 83.2, symbol: "₹" },
};

export function formatPrice(usd: number, currency: AppState["currency"] = "USD"): string {
  const { rate, symbol } = RATES[currency];
  const v = Math.round(usd * rate);
  return `${symbol}${v.toLocaleString("en-US")}`;
}

export { RATES };
