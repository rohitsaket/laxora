import type {
  JewelryProduct,
  LooseDiamond,
  Collection,
  Review,
  Testimonial,
  Store,
  AppointmentSlot,
} from "./types";

// ============ Helper: image source ============
// Use Unsplash for high-quality luxury jewelry imagery.
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// ============ Collections ============
export const COLLECTIONS: Collection[] = [
  {
    id: "celeste",
    name: "Céleste",
    tagline: "Heavenly brilliance",
    description:
      "An ethereal collection of solitaires that captures the night sky in certified diamonds.",
    image: img("1605100804763-247f67b3557e"),
    productCount: 24,
  },
  {
    id: "lumiere",
    name: "Lumière",
    tagline: "Light made eternal",
    description:
      "Inspired by Parisian ateliers, Lumière pieces channel timeless romance with modern lines.",
    image: img("1611652022419-a9419f74343d"),
    productCount: 18,
  },
  {
    id: "eternelle",
    name: "Éternelle",
    tagline: "Forever, in form",
    description:
      "The Éternelle collection celebrates milestones with eternity bands and bridal sets.",
    image: img("1606760227091-3dd870d97f1d"),
    productCount: 31,
  },
  {
    id: "aura",
    name: "Aura",
    tagline: "Quiet confidence",
    description:
      "Minimalist statement pieces in platinum and 18k gold, designed for daily luxury.",
    image: img("1599643478518-a784e5dc4c8f"),
    productCount: 22,
  },
  {
    id: "noir",
    name: "Noir",
    tagline: "Black diamond drama",
    description:
      "Bold, sculptural pieces featuring rare black and cognac diamonds for the unconventional.",
    image: img("1601121141461-9d6647bca1ed"),
    productCount: 14,
  },
  {
    id: "heritage",
    name: "Heritage",
    tagline: "Art deco revived",
    description:
      "Heritage revives the geometric glamour of the 1920s with hand-set baguettes.",
    image: img("1602751584552-55ba02d237ba"),
    productCount: 17,
  },
];

// ============ Jewelry Products ============
const baseProducts: Array<Partial<JewelryProduct> & { name: string; category: JewelryProduct["category"]; collection: string; priceUSD: number }> = [
  // Engagement rings
  { name: "Solitaire Céleste Engagement Ring", category: "Engagement Rings", collection: "Céleste", priceUSD: 8450, caratWeight: 1.2, centerStoneShape: "Round", badge: "Bestseller" },
  { name: "Lumière Halo Engagement Ring", category: "Engagement Rings", collection: "Lumière", priceUSD: 12200, caratWeight: 1.5, centerStoneShape: "Oval", badge: "Bestseller" },
  { name: "Éternelle Three-Stone Ring", category: "Engagement Rings", collection: "Éternelle", priceUSD: 9800, caratWeight: 1.8, centerStoneShape: "Emerald", badge: "Bridal" },
  { name: "Aura Bezel Solitaire", category: "Engagement Rings", collection: "Aura", priceUSD: 6700, caratWeight: 1.0, centerStoneShape: "Round", badge: "New Arrival" },
  { name: "Heritage Art Deco Ring", category: "Engagement Rings", collection: "Heritage", priceUSD: 14500, caratWeight: 2.0, centerStoneShape: "Cushion", badge: "Limited Edition" },
  { name: "Noir Black Diamond Ring", category: "Engagement Rings", collection: "Noir", priceUSD: 11200, caratWeight: 1.4, centerStoneShape: "Pear", badge: "Exclusive" },
  { name: "Céleste Pavé Engagement Ring", category: "Engagement Rings", collection: "Céleste", priceUSD: 7900, caratWeight: 1.1, centerStoneShape: "Princess" },
  { name: "Lumière Hidden Halo Ring", category: "Engagement Rings", collection: "Lumière", priceUSD: 10500, caratWeight: 1.3, centerStoneShape: "Oval", badge: "New Arrival" },

  // Wedding bands
  { name: "Éternelle Diamond Eternity Band", category: "Wedding Bands", collection: "Éternelle", priceUSD: 4200, caratWeight: 1.0, centerStoneShape: "Round", badge: "Bestseller" },
  { name: "Aura Plain Platinum Band", category: "Wedding Bands", collection: "Aura", priceUSD: 1850, caratWeight: 0 },
  { name: "Heritage Channel-Set Band", category: "Wedding Bands", collection: "Heritage", priceUSD: 3900, caratWeight: 0.8, centerStoneShape: "Princess" },
  { name: "Céleste Shared-Prong Band", category: "Wedding Bands", collection: "Céleste", priceUSD: 5100, caratWeight: 1.4, centerStoneShape: "Round" },
  { name: "Noir Matte Black Band", category: "Wedding Bands", collection: "Noir", priceUSD: 2950, caratWeight: 0 },

  // Rings (fashion)
  { name: "Lumière Cocktail Ring", category: "Rings", collection: "Lumière", priceUSD: 6800, caratWeight: 2.4, centerStoneShape: "Emerald", badge: "Bestseller" },
  { name: "Aura Signet Ring", category: "Rings", collection: "Aura", priceUSD: 2200, caratWeight: 0 },
  { name: "Heritage Geometric Ring", category: "Rings", collection: "Heritage", priceUSD: 5400, caratWeight: 1.6, centerStoneShape: "Baguette" as any },

  // Necklaces
  { name: "Céleste Diamond Pendant", category: "Necklaces", collection: "Céleste", priceUSD: 5600, caratWeight: 0.9, centerStoneShape: "Round", badge: "Bestseller" },
  { name: "Lumière Tennis Necklace", category: "Necklaces", collection: "Lumière", priceUSD: 18900, caratWeight: 7.5, centerStoneShape: "Round", badge: "Exclusive" },
  { name: "Éternelle Heart Pendant", category: "Necklaces", collection: "Éternelle", priceUSD: 3400, caratWeight: 0.5, centerStoneShape: "Heart" },
  { name: "Aura Bar Pendant", category: "Necklaces", collection: "Aura", priceUSD: 2100, caratWeight: 0.4 },
  { name: "Noir Onyx Necklace", category: "Necklaces", collection: "Noir", priceUSD: 4300, caratWeight: 0.6, centerStoneShape: "Pear" },

  // Earrings
  { name: "Céleste Stud Earrings", category: "Earrings", collection: "Céleste", priceUSD: 3800, caratWeight: 1.0, centerStoneShape: "Round", badge: "Bestseller" },
  { name: "Lumière Drop Earrings", category: "Earrings", collection: "Lumière", priceUSD: 7200, caratWeight: 2.6, centerStoneShape: "Pear", badge: "New Arrival" },
  { name: "Heritage Chandelier Earrings", category: "Earrings", collection: "Heritage", priceUSD: 9800, caratWeight: 4.2, centerStoneShape: "Emerald", badge: "Exclusive" },
  { name: "Aura Huggie Earrings", category: "Earrings", collection: "Aura", priceUSD: 1900, caratWeight: 0.4 },
  { name: "Noir Black Stud Earrings", category: "Earrings", collection: "Noir", priceUSD: 2600, caratWeight: 0.8, centerStoneShape: "Round" },

  // Bracelets
  { name: "Éternelle Tennis Bracelet", category: "Bracelets", collection: "Éternelle", priceUSD: 12500, caratWeight: 5.0, centerStoneShape: "Round", badge: "Bestseller" },
  { name: "Aura Bangle Bracelet", category: "Bracelets", collection: "Aura", priceUSD: 2800, caratWeight: 0.3 },
  { name: "Céleste Charm Bracelet", category: "Bracelets", collection: "Céleste", priceUSD: 4600, caratWeight: 1.2, centerStoneShape: "Round" },
  { name: "Heritage Cuff Bracelet", category: "Bracelets", collection: "Heritage", priceUSD: 6900, caratWeight: 2.0, centerStoneShape: "Baguette" as any },
];

// Image pool per category
const imagePool: Record<string, string[]> = {
  "Engagement Rings": [
    img("1605100804763-247f67b3557e"),
    img("1611652022419-a9419f74343d"),
    img("1606760227091-3dd870d97f1d"),
    img("1601121141461-9d6647bca1ed"),
  ],
  "Wedding Bands": [
    img("1602751584552-55ba02d237ba"),
    img("1599643478518-a784e5dc4c8f"),
    img("1535632066274-36f1d25b1b0c"),
  ],
  Rings: [
    img("1603561591411-07134e71a2a9"),
    img("1611652022419-a9419f74343d"),
  ],
  Necklaces: [
    img("1599643478518-a784e5dc4c8f"),
    img("1611591437281-460bfbe1220a"),
    img("1605100804763-247f67b3557e"),
  ],
  Earrings: [
    img("1535632066274-36f1d25b1b0c"),
    img("1602173574767-37ac01994b2a"),
    img("1599643478518-a784e5dc4c8f"),
  ],
  Bracelets: [
    img("1611591437281-460bfbe1220a"),
    img("1605100804763-247f67b3557e"),
    img("1602751584552-55ba02d237ba"),
  ],
};

const descByCat: Record<string, string> = {
  "Engagement Rings":
    "A certified LUXORA solitaire crafted to celebrate a lifetime. Hand-set in 18k gold or platinum with a GIA-certified center stone, this ring is finished by master artisans in our Antwerp atelier.",
  "Wedding Bands":
    "An eternity band designed for daily wear. Each diamond is precision-set to maximize light return, with a comfort-fit profile that feels weightless on the hand.",
  Rings:
    "A sculptural statement ring that pairs sculpted metalwork with hand-selected diamonds. Designed to be worn alone or stacked.",
  Necklaces:
    "A pendant necklace suspended from a delicate cable chain. The center diamond is secured in a four-prong basket that lifts it toward the light.",
  Earrings:
    "Timeless earrings that transition effortlessly from day to evening. Secure locking backs ensure all-day comfort.",
  Bracelets:
    "A tennis bracelet with a double-safety clasp, hand-strung with individually set diamonds for fluidity and strength.",
};

export const PRODUCTS: JewelryProduct[] = baseProducts.map((p, idx) => {
  const slug =
    p.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${idx + 1}`;
  const metals = pickMetals(p.category);
  const pool = imagePool[p.category] ?? imagePool.Rings;
  return {
    id: `lx-${String(idx + 1).padStart(3, "0")}`,
    slug,
    name: p.name,
    category: p.category,
    collection: p.collection,
    description: descByCat[p.category],
    story: `Inspired by the ${p.collection} collection's signature aesthetic, the ${p.name} embodies LUXORA's commitment to certified, ethically-sourced brilliance.`,
    metals,
    priceUSD: p.priceUSD,
    compareAtUSD: p.badge === "Bestseller" ? Math.round(p.priceUSD * 1.15) : undefined,
    caratWeight: p.caratWeight,
    centerStoneShape: p.centerStoneShape,
    images: [pool[idx % pool.length], pool[(idx + 1) % pool.length], pool[(idx + 2) % pool.length]],
    rating: round1(4.4 + ((idx * 7) % 6) / 10),
    reviewsCount: 18 + ((idx * 13) % 240),
    badge: p.badge,
    certificate: "GIA",
    tags: buildTags(p),
    features: buildFeatures(p),
    variants: metals.map((m, vi) => ({
      id: `${slug}-${m}`.toLowerCase().replace(/\s+/g, "-"),
      metal: m,
      carat: p.caratWeight,
      priceUSD: p.priceUSD + vi * 350,
      inStock: 3 + ((idx * 5 + vi * 2) % 9),
      image: pool[(idx + vi) % pool.length],
    })),
  } as JewelryProduct;
});

function pickMetals(category: string): JewelryProduct["metals"] {
  if (category === "Wedding Bands") return ["Yellow Gold", "White Gold", "Platinum"];
  if (category === "Engagement Rings") return ["Yellow Gold", "White Gold", "Rose Gold", "Platinum"];
  return ["Yellow Gold", "White Gold", "Rose Gold"];
}

function buildTags(p: { collection: string; category: string; centerStoneShape?: string; badge?: string }): string[] {
  const tags = [p.collection, p.category];
  if (p.centerStoneShape) tags.push(`${p.centerStoneShape} Diamond`);
  if (p.badge) tags.push(p.badge);
  return tags;
}

function buildFeatures(p: { category: string; caratWeight: number }): string[] {
  const base = ["Ethically sourced", "Hand-set by master artisans", "Lifetime warranty", "Free worldwide shipping"];
  if (p.caratWeight > 0) base.unshift(`${p.caratWeight} ct total weight`);
  if (p.category.includes("Engagement")) base.splice(2, 0, "GIA certified center stone");
  return base;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

// ============ Loose Diamonds ============
const shapes: LooseDiamond["shape"][] = ["Round", "Princess", "Oval", "Emerald", "Cushion", "Pear", "Radiant", "Marquise", "Asscher", "Heart"];
const colors: LooseDiamond["color"][] = ["D", "E", "F", "G", "H", "I", "J"];
const clarities: LooseDiamond["clarity"][] = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];
const cuts: LooseDiamond["cut"][] = ["Excellent", "Very Good", "Good"];
const certs: LooseDiamond["certificate"][] = ["GIA", "IGI", "HRD", "AGS"];
const diamondImages = [
  img("1605100804763-247f67b3557e"),
  img("1611652022419-a9419f74343d"),
  img("1606760227091-3dd870d97f1d"),
  img("1602751584552-55ba02d237ba"),
  img("1601121141461-9d6647bca1ed"),
];

function priceFor(shape: string, carat: number, color: string, clarity: string, cut: string) {
  // simplified Rapaport-like curve
  const base = 4000 * carat * carat;
  const shapeMult: Record<string, number> = {
    Round: 1.0, Oval: 0.85, Pear: 0.83, Princess: 0.78, Emerald: 0.8,
    Cushion: 0.82, Radiant: 0.81, Marquise: 0.79, Asscher: 0.77, Heart: 0.8,
  };
  const colorIdx = colors.indexOf(color as any);
  const clarityIdx = clarities.indexOf(clarity as any);
  const cutMult = cut === "Excellent" ? 1.15 : cut === "Very Good" ? 1.0 : 0.88;
  const colorMult = 1.4 - colorIdx * 0.05;
  const clarityMult = 2.0 - clarityIdx * 0.12;
  return Math.round((base * (shapeMult[shape] ?? 1) * colorMult * clarityMult * cutMult) / 10) * 10;
}

export const DIAMONDS: LooseDiamond[] = Array.from({ length: 60 }).map((_, i) => {
  const shape = shapes[i % shapes.length];
  const carat = round2(0.3 + ((i * 0.17) % 3.5));
  const color = colors[(i * 3) % colors.length];
  const clarity = clarities[(i * 5) % clarities.length];
  const cut = cuts[i % cuts.length];
  const cert = certs[i % certs.length];
  const price = priceFor(shape, carat, color, clarity, cut);
  const tableP = 55 + ((i * 7) % 12);
  const depthP = 58 + ((i * 5) % 12);
  const lMM = round2(4 + carat * 2 + (i % 3) * 0.2);
  const wMM = round2(lMM * (shape === "Round" ? 1 : 0.7 + (i % 3) * 0.05));
  return {
    id: `dia-${String(i + 1).padStart(4, "0")}`,
    stock: `LX-${100000 + i * 37}`,
    shape,
    carat,
    color,
    clarity,
    cut,
    polish: i % 5 === 0 ? "Very Good" : "Excellent",
    symmetry: i % 7 === 0 ? "Very Good" : "Excellent",
    fluorescence: (["None", "Faint", "Medium"] as const)[i % 3],
    certificate: cert,
    certificateId: `${cert}-${1000000 + i * 137}`,
    priceUSD: price,
    image: diamondImages[i % diamondImages.length],
    tablePercent: tableP,
    depthPercent: depthP,
    lengthMM: lMM,
    widthMM: wMM,
    ratio: round2(lMM / wMM),
  };
});

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

// ============ Reviews ============
const reviewAuthors = ["Aarav Mehta", "Sophia Laurent", "Olivia Bennett", "Liam Chen", "Emma Schmidt", "Noah Williams", "Ava Rossi", "Ethan Park", "Isabella Cruz", "Lucas Müller", "Mia Tanaka", "Charlotte Dubois"];
const reviewLocations = ["Mumbai, IN", "Paris, FR", "London, UK", "Singapore, SG", "Berlin, DE", "New York, US", "Milan, IT", "Seoul, KR", "Madrid, ES", "Zurich, CH", "Tokyo, JP", "Brussels, BE"];
const reviewTitles = ["Absolutely stunning", "Worth every penny", "Beyond expectations", "Craftsmanship is unmatched", "She said yes immediately", "A piece of art", "Heirloom quality", "Sparkles like nothing else", "Picture doesn't do justice", "Timeless elegance"];
const reviewBodies = [
  "The diamond is breathtaking in person — the brilliance under any light is unreal. The setting feels substantial without being heavy, and the certificate gave us total confidence in the purchase.",
  "From the unboxing to the actual proposal, every detail felt considered. LUXORA's craftsmanship is on another level compared to other jewelers we visited.",
  "I have purchased fine jewelry from many houses, and LUXORA's attention to detail sets them apart. The packaging alone is a work of art.",
  "The ring arrived perfectly polished, with all certificates included. The 360° view online matched the actual ring exactly — no surprises, only delight.",
  "We worked with the LUXORA concierge to customize the metal and engraving. The final piece exceeded what we imagined. Highly recommend the bespoke experience.",
  "Beautifully crafted and the diamond certification is genuine — I verified it independently. Will definitely return for our anniversary.",
];

export function reviewsFor(productId: string, count = 4): Review[] {
  return Array.from({ length: count }).map((_, i) => {
    const seed = parseInt(productId.replace(/\D/g, "") || "1", 10) + i;
    return {
      id: `rev-${productId}-${i + 1}`,
      productId,
      author: reviewAuthors[(seed + i * 3) % reviewAuthors.length],
      location: reviewLocations[(seed + i * 5) % reviewLocations.length],
      rating: 4 + ((seed + i) % 2),
      title: reviewTitles[(seed + i * 2) % reviewTitles.length],
      body: reviewBodies[(seed + i) % reviewBodies.length],
      date: new Date(Date.now() - (i + 1) * 86400000 * 14).toISOString(),
      verifiedBuyer: i % 5 !== 4,
      purchaseType: ["Engagement Ring", "Wedding Band", "Necklace", "Earrings"][(seed + i) % 4],
      helpful: (seed * 3 + i * 7) % 48,
    };
  });
}

// ============ Testimonials ============
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Priya & Arjun",
    location: "Mumbai, India",
    rating: 5,
    quote:
      "LUXORA designed a custom engagement ring that captured our story perfectly. The diamond's brilliance is unmatched — we still catch ourselves staring at it.",
    purchaseType: "Custom Engagement Ring",
    initials: "PA",
  },
  {
    id: "t2",
    author: "Sophia Laurent",
    location: "Paris, France",
    rating: 5,
    quote:
      "I have collected fine jewelry for two decades. LUXORA's craftsmanship rivals the great houses of Place Vendôme — but with a more personal touch.",
    purchaseType: "Lumière Tennis Necklace",
    initials: "SL",
  },
  {
    id: "t3",
    author: "Olivia & Henry",
    location: "London, United Kingdom",
    rating: 5,
    quote:
      "From the virtual consultation to the final fitting, every moment felt special. The ring is more beautiful than I could have imagined.",
    purchaseType: "Céleste Solitaire",
    initials: "OH",
  },
  {
    id: "t4",
    author: "Mei Tanaka",
    location: "Tokyo, Japan",
    rating: 5,
    quote:
      "The certification process is transparent and the diamond is exquisite. LUXORA earned a customer for life.",
    purchaseType: "Heritage Earrings",
    initials: "MT",
  },
];

// ============ Stores ============
export const STORES: Store[] = [
  { id: "store-antwerp", name: "LUXORA Antwerp Atelier", city: "Antwerp", country: "Belgium", address: "12 Hoveniersstraat, Diamond District", phone: "+32 3 555 0100", hours: "Mon–Sat, 10:00–19:00" },
  { id: "store-mumbai", name: "LUXORA Mumbai Flagship", city: "Mumbai", country: "India", address: "Taj Mahal Palace, Apollo Bunder", phone: "+91 22 5555 0100", hours: "Mon–Sun, 11:00–20:00" },
  { id: "store-newyork", name: "LUXORA New York Boutique", city: "New York", country: "USA", address: "725 Fifth Avenue, Manhattan", phone: "+1 212 555 0100", hours: "Mon–Sat, 10:00–18:00" },
  { id: "store-dubai", name: "LUXORA Dubai Boutique", city: "Dubai", country: "UAE", address: "The Dubai Mall, Fashion Avenue", phone: "+971 4 555 0100", hours: "Daily, 10:00–22:00" },
  { id: "store-singapore", name: "LUXORA Singapore Marina", city: "Singapore", country: "Singapore", address: "Marina Bay Sands, Bay Level", phone: "+65 6555 0100", hours: "Daily, 10:30–21:30" },
  { id: "store-london", name: "LUXORA London Mayfair", city: "London", country: "UK", address: "46 New Bond Street, Mayfair", phone: "+44 20 5555 0100", hours: "Mon–Sat, 10:00–18:30" },
];

// ============ Appointment Slots ============
export function getAppointmentSlots(storeId: string, daysAhead = 14): AppointmentSlot[] {
  const staff = ["Aria Kapoor (Senior Gemologist)", "Marcus Vermeer (Master Jeweler)", "Sophie Bernard (Diamond Consultant)", "Daniel Kim (Bespoke Designer)"];
  const slots: AppointmentSlot[] = [];
  const now = new Date();
  for (let d = 1; d <= daysAhead; d++) {
    const day = new Date(now.getTime() + d * 86400000);
    if (day.getDay() === 0) continue; // skip Sundays
    const dayStr = day.toISOString().split("T")[0];
    const times = ["10:30", "12:00", "13:30", "15:00", "16:30"];
    times.forEach((time, i) => {
      slots.push({
        id: `slot-${storeId}-${d}-${i}`,
        date: dayStr,
        time,
        staff: staff[(d + i) % staff.length],
        type: i % 3 === 2 ? "Virtual" : "In-Store",
        storeId,
      });
    });
  }
  return slots;
}

// ============ Diamond Education Content ============
export const FOUR_CS = [
  {
    key: "cut",
    name: "Cut",
    tagline: "The architecture of brilliance",
    description:
      "Cut is the most important of the 4Cs. It refers not to a diamond's shape, but to how precisely its facets interact with light. A master cutter's skill determines the diamond's brilliance, fire, and scintillation. At LUXORA, every Excellent-cut diamond is verified by independent laboratories.",
    grades: ["Excellent", "Very Good", "Good", "Fair"],
    icon: "Sparkles",
  },
  {
    key: "color",
    name: "Color",
    tagline: "From icy D to warm J",
    description:
      "Diamond color is graded on a D-to-Z scale, where D is completely colorless and Z carries noticeable tint. Most LUXORA diamonds are graded D–H. Colorless diamonds are rarer and more valuable because they allow more light to pass through, creating a brighter appearance.",
    grades: ["D (Colorless)", "E", "F", "G (Near Colorless)", "H", "I", "J"],
    icon: "Droplet",
  },
  {
    key: "clarity",
    name: "Clarity",
    tagline: "Nature's fingerprint",
    description:
      "Clarity measures the tiny natural inclusions and blemishes in a diamond. Most are invisible to the naked eye. Grades range from Flawless (FL) to Included (I3). LUXORA only offers diamonds graded SI2 or higher, so every stone is eye-clean.",
    grades: ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"],
    icon: "Search",
  },
  {
    key: "carat",
    name: "Carat",
    tagline: "Weight, not size",
    description:
      "Carat is a measure of weight equal to 200 milligrams. Because larger diamonds are rarer in nature, price increases exponentially with carat weight. Two diamonds of the same carat can look very different depending on cut and shape — a well-cut 1.0ct often appears larger than a poorly-cut 1.2ct.",
    grades: ["0.30ct", "0.50ct", "0.75ct", "1.00ct", "1.50ct", "2.00ct", "3.00ct+"],
    icon: "Scale",
  },
];

export const DIAMOND_SHAPES = [
  { name: "Round", desc: "Maximum brilliance, timeless appeal", image: img("1605100804763-247f67b3557e") },
  { name: "Princess", desc: "Modern geometric with sharp corners", image: img("1611652022419-a9419f74343d") },
  { name: "Oval", desc: "Elongated, finger-flattering silhouette", image: img("1606760227091-3dd870d97f1d") },
  { name: "Emerald", desc: "Step-cut hall-of-mirrors effect", image: img("1602751584552-55ba02d237ba") },
  { name: "Cushion", desc: "Soft pillow shape, vintage warmth", image: img("1601121141461-9d6647bca1ed") },
  { name: "Pear", desc: "Teardrop combining round and marquise", image: img("1605100804763-247f67b3557e") },
  { name: "Radiant", desc: "Brilliant-cut corners, vivid sparkle", image: img("1611652022419-a9419f74343d") },
  { name: "Marquise", desc: "Boat-shaped, maximizes carat size", image: img("1606760227091-3dd870d97f1d") },
  { name: "Asscher", desc: "Octagonal step-cut, art deco soul", image: img("1602751584552-55ba02d237ba") },
  { name: "Heart", desc: "Romantic, requires master cutting", image: img("1601121141461-9d6647bca1ed") },
];

// ============ Look book / instagram ============
export const INSTAGRAM_IMAGES = [
  img("1605100804763-247f67b3557e", 600),
  img("1611652022419-a9419f74343d", 600),
  img("1606760227091-3dd870d97f1d", 600),
  img("1602751584552-55ba02d237ba", 600),
  img("1601121141461-9d6647bca1ed", 600),
  img("1599643478518-a784e5dc4c8f", 600),
];
