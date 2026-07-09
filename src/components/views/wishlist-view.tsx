"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight, Share2, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { toast } from "sonner";

export function WishlistView() {
  const { wishlist, navigate } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  // Allow diamonds in wishlist too — they have id like "dia-XXXX"
  const diamondIds = wishlist.filter((id) => id.startsWith("dia-"));

  return (
    <div className="py-10 lg:py-14 max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">Saved For Later</p>
          <h1 className="font-display text-4xl md:text-5xl">Your Wishlist</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {items.length + diamondIds.length} item{(items.length + diamondIds.length) === 1 ? "" : "s"} · Private to you
          </p>
        </div>
        {items.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Wishlist link copied to clipboard")}
          >
            <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share List
          </Button>
        )}
      </motion.div>

      {items.length === 0 && diamondIds.length === 0 ? (
        <div className="py-32 text-center">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl">Your wishlist is empty</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Save pieces you love by tapping the heart icon. Your wishlist is private and stays with your account.
          </p>
          <Button
            onClick={() => navigate("shop", { shopCategory: "all" })}
            className="mt-6 bg-gold text-onyx hover:bg-gold/90"
          >
            Explore Collection <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      ) : (
        <>
          {/* Wedding Registry promo */}
          <div className="mb-8 p-6 bg-gradient-to-r from-secondary/40 to-secondary/10 border border-gold/30 rounded-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-luxe text-gold mb-1">LUXORA Wedding Registry</p>
              <p className="font-display text-xl">Creating a wedding or anniversary list?</p>
              <p className="text-xs text-muted-foreground mt-1">Share your wishlist with loved ones and track gift contributions.</p>
            </div>
            <Button
              variant="outline"
              className="border-gold/40 text-gold hover:bg-gold hover:text-onyx"
              onClick={() => toast.success("Registry creation coming soon — we'll notify you.")}
            >
              Create Registry
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          {diamondIds.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl mb-5">Saved Diamonds</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {diamondIds.length} diamond{diamondIds.length === 1 ? "" : "s"} saved.{" "}
                <button onClick={() => navigate("diamonds")} className="text-gold underline">
                  View in vault
                </button>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
