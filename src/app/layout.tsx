import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { StoreProvider } from "@/components/providers/store-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUXORA — Certified Diamonds & Fine Jewelry",
  description:
    "LUXORA is a luxury house of certified diamonds and fine jewelry. Discover ethically sourced engagement rings, wedding bands, necklaces, earrings and bespoke custom jewelry, backed by GIA & IGI certification and lifetime warranty.",
  keywords: [
    "LUXORA",
    "luxury jewelry",
    "diamond rings",
    "engagement rings",
    "wedding bands",
    "certified diamonds",
    "GIA",
    "IGI",
    "fine jewelry",
    "custom jewelry",
  ],
  authors: [{ name: "LUXORA" }],
  openGraph: {
    title: "LUXORA — Certified Diamonds & Fine Jewelry",
    description:
      "Discover ethically sourced diamonds and bespoke luxury jewelry, crafted to last generations.",
    siteName: "LUXORA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXORA — Certified Diamonds & Fine Jewelry",
    description:
      "Discover ethically sourced diamonds and bespoke luxury jewelry, crafted to last generations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} font-body antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>{children}</StoreProvider>
          <Toaster />
          <Sonner position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
