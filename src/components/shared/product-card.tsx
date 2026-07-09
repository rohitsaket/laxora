"use client";

import { motion } from "framer-motion";
import { Heart, Eye, Star, Plus } from "lucide-react";
import { useStore, formatPrice } from "@/lib/store";
import type { JewelryProduct } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Props {
  product: JewelryProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  const { navigate, toggleWishlist, isWishlisted, addToCart, currency } = useStore();
  const wished = isWishlisted(product.id);

  const onQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      metal: product.metals[0],
      carat: product.caratWeight,
      priceUSD: product.priceUSD,
      type: "jewelry",
    });
    toast.success(`${product.name} added to bag`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3) }}
      className="group cursor-pointer"
      onClick={() => navigate("product", { productId: product.id })}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm">
        {/* Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        {/* Secondary image hover */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <Badge
              variant="secondary"
              className={`text-[9px] tracking-luxe-sm uppercase ${
                product.badge === "Bestseller"
                  ? "bg-gold text-onyx"
                  : product.badge === "New Arrival"
                  ? "bg-foreground text-background"
                  : "bg-onyx/85 text-foreground border border-gold/30"
              }`}
            >
              {product.badge}
            </Badge>
          )}
          {product.compareAtUSD && (
            <Badge variant="secondary" className="text-[9px] tracking-luxe-sm uppercase bg-destructive text-white">
              Sale
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          aria-label="Toggle wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass-luxe border border-border/40 flex items-center justify-center hover:border-gold transition"
        >
          <Heart className={`w-4 h-4 ${wished ? "fill-gold text-gold" : ""}`} />
        </button>

        {/* Quick actions */}
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("product", { productId: product.id });
              }}
              className="glass-luxe border border-border/40 text-[11px] uppercase tracking-luxe-sm py-2 hover:border-gold hover:text-gold transition"
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" /> View
            </button>
            <button
              onClick={onQuickAdd}
              className="bg-gold text-onyx text-[11px] uppercase tracking-luxe-sm py-2 hover:bg-gold/90 transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 text-center">
        <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-1">
          {product.collection}
        </p>
        <h3 className="text-sm font-medium leading-snug">{product.name}</h3>
        <div className="flex items-center justify-center gap-1 mt-1">
          <Star className="w-3 h-3 fill-gold text-gold" />
          <span className="text-[11px] text-muted-foreground">
            {product.rating.toFixed(1)} · {product.reviewsCount} reviews
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-sm font-display">{formatPrice(product.priceUSD, currency)}</span>
          {product.compareAtUSD && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtUSD, currency)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
