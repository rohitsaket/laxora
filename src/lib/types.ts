// ============ LUXORA Domain Types ============

export type Metal = "Yellow Gold" | "White Gold" | "Rose Gold" | "Platinum" | "Sterling Silver";
export type DiamondShape =
  | "Round"
  | "Princess"
  | "Oval"
  | "Emerald"
  | "Cushion"
  | "Pear"
  | "Radiant"
  | "Marquise"
  | "Asscher"
  | "Heart";
export type DiamondColor = "D" | "E" | "F" | "G" | "H" | "I" | "J";
export type DiamondClarity = "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1" | "SI2";
export type DiamondCut = "Excellent" | "Very Good" | "Good";
export type Certification = "GIA" | "IGI" | "HRD" | "AGS";

export type Category =
  | "Rings"
  | "Engagement Rings"
  | "Wedding Bands"
  | "Necklaces"
  | "Earrings"
  | "Bracelets"
  | "Loose Diamonds";

export interface ProductVariant {
  id: string;
  metal: Metal;
  carat: number;
  priceUSD: number;
  inStock: number;
  image: string;
}

export interface JewelryProduct {
  id: string;
  slug: string;
  name: string;
  category: Category;
  collection: string;
  description: string;
  story?: string;
  metals: Metal[];
  priceUSD: number;
  compareAtUSD?: number;
  caratWeight: number;
  centerStoneShape?: DiamondShape;
  images: string[];
  rating: number;
  reviewsCount: number;
  badge?: "Bestseller" | "New Arrival" | "Bridal" | "Limited Edition" | "Exclusive";
  certificate?: Certification;
  tags: string[];
  features: string[];
  variants?: ProductVariant[];
}

export interface LooseDiamond {
  id: string;
  stock: string;
  shape: DiamondShape;
  carat: number;
  color: DiamondColor;
  clarity: DiamondClarity;
  cut: DiamondCut;
  polish: "Excellent" | "Very Good" | "Good";
  symmetry: "Excellent" | "Very Good" | "Good";
  fluorescence: "None" | "Faint" | "Medium" | "Strong";
  certificate: Certification;
  certificateId: string;
  priceUSD: number;
  // imagery
  image: string;
  video?: string;
  // measurements
  tablePercent: number;
  depthPercent: number;
  lengthMM: number;
  widthMM: number;
  ratio: number;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verifiedBuyer: boolean;
  purchaseType: string;
  helpful: number;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  quote: string;
  purchaseType: string;
  initials: string;
}

export interface AppointmentSlot {
  id: string;
  date: string;
  time: string;
  staff: string;
  type: "In-Store" | "Virtual";
  storeId: string;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  hours: string;
}
