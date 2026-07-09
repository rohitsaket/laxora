# 💎 LUXORA — Luxury Diamond & Jewelry Ecommerce Platform

A production-grade Next.js 16 luxury ecommerce platform for certified diamonds and fine jewelry.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York)
- **State**: Zustand (persisted) + TanStack Query
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **AI**: z-ai-web-dev-sdk (server-side only)
- **Database**: Prisma ORM (SQLite client available; not used in current build)
- **Fonts**: Inter (body) + Cormorant Garamond (display)
- **Themes**: next-themes (light/dark)

## Quick Start

```bash
# 1. Install dependencies
bun install        # or: npm install

# 2. (Optional) Initialize the database
bun run db:push

# 3. Start the dev server
bun run dev        # or: npm run dev
```

Open `http://localhost:3000` in your browser.

> **Production build**: `bun run build && bun run start`

## Environment Variables

Create a `.env.local` file at the project root:

```bash
# Z.ai SDK credentials (for AI concierge "Aria")
# Get these from https://z.ai
ZAI_API_KEY=your_key_here

# Database (optional — current build runs without DB)
DATABASE_URL="file:./prisma/dev.db"
```

If `ZAI_API_KEY` is missing, the AI assistant falls back to a canned response — the rest of the site works fine.

## Project Structure

```
src/
├── app/
│   ├── globals.css              # Luxury design tokens (gold/onyx palette)
│   ├── layout.tsx               # Root layout (fonts, providers)
│   ├── page.tsx                 # View router (single-route SPA)
│   └── api/
│       ├── ai-chat/route.ts     # AI concierge backend
│       └── route.ts             # Health check
├── components/
│   ├── providers/               # Theme + Store hydration
│   ├── layout/                  # Announcement, Header, CartDrawer, Footer
│   ├── shared/                  # ProductCard, SectionHeader
│   ├── views/                   # 12 views (home, shop, pdp, diamonds, cart,
│   │                            #          checkout, wishlist, account, builder,
│   │                            #          appointments, education, auth-modal)
│   └── ai/                      # AIAssistant floating chat
├── lib/
│   ├── types.ts                 # Domain types (JewelryProduct, LooseDiamond, etc.)
│   ├── data.ts                  # Mock catalog: 6 collections, 30 products,
│   │                            # 60 diamonds, reviews, testimonials, stores
│   └── store.ts                 # Zustand store (cart, wishlist, nav, auth, builder)
└── prisma/
    └── schema.prisma            # Prisma schema (ready for future DB integration)
```

## Features

| Area | Features |
|------|----------|
| **Homepage** | Cinematic hero with parallax, 14 sections (collections, categories, diamonds, new arrivals, bestsellers, bridal, builder promo, education, brand story, craftsmanship timeline, trust badges, testimonials, Instagram, newsletter) |
| **Catalog** | Sidebar filters (category, collection, price slider, metal, shape), sorting, grid/compact toggle, mobile filter sheet |
| **Diamond Vault** | 60 GIA/IGI/HRD/AGS-certified loose diamonds; advanced filters; sortable table; click-to-open detail modal |
| **Product Detail** | Image gallery + zoom, metal variants, tabs (specs/shipping/reviews), trust badges, related products |
| **Cart & Checkout** | Slide-out drawer + dedicated cart view, gift wrap, insurance, coupon (`LUXORA10` = 10% off), 4-step checkout |
| **Account** | Auth modal, 6-tab dashboard (overview, orders, wishlist, appointments, certificates, loyalty) |
| **Custom Builder** | 3-step configurator with live pricing (carat × color × clarity × cut multipliers) |
| **Appointments** | In-boutique or virtual, 6 global stores, 7-day calendar, time slots, confirmation |
| **Education** | Tabbed hub: 4Cs, Diamond Shapes, Certifications, Buying Guide |
| **AI Concierge** | Floating "Aria" chatbot with luxury-tone system prompt |
| **Persistence** | Cart, wishlist, recently-viewed, auth, currency, builder state — all survive reloads |
| **Theming** | Light (Ivory) + Dark (Onyx) luxury themes |

## Design System

Custom luxury palette exposed as CSS variables in `globals.css`:

- `--gold` Luxury Gold
- `--gold-soft` Soft Gold
- `--champagne` Champagne
- `--rose-gold` Rose Gold
- `--platinum` Platinum
- `--onyx` Black Onyx

Plus utility classes: `.font-display`, `.text-gold-gradient`, `.glass-luxe`, `.shadow-luxe`, `.shadow-gold-glow`, `.bg-radial-luxe`, `.tracking-luxe`, `.luxury-underline`.

## Currency Support

Switch between USD / EUR / GBP / INR from the header (globe icon). Conversion rates are client-side; price formatting via `formatPrice(usd, currency)` in `lib/store.ts`.

## Roadmap Origin

This implements the user-facing phases of the **LUXORA Enterprise Edition v2** 50-phase roadmap (Phases 1–28 condensed into a single deployable luxury storefront). Backend-only phases (inventory, vendor portal, ERP, BI, DevOps) are intentionally omitted.

## License

Internal demo project. All diamond imagery via Unsplash; mock data is fictional.

---

Crafted with care — Antwerp · Mumbai · New York · Dubai · Singapore · London
