"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Gift, Shield, Trash2, Plus, Minus, ShoppingBag, Tag, Truck } from "lucide-react";
import { useStore, formatPrice } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";

export function CartView() {
  const { cart, updateQty, removeFromCart, toggleGiftWrap, toggleInsurance, cartSubtotal, navigate, currency } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const subtotal = cartSubtotal();
  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal - discount > 5000 || subtotal === 0 ? 0 : 75;
  const tax = Math.round((subtotal - discount) * 0.07);
  const total = subtotal - discount + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="py-32 text-center max-w-md mx-auto px-6">
        <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-3xl">Your bag is empty</h1>
        <p className="text-sm text-muted-foreground mt-2">Discover timeless pieces crafted to last.</p>
        <Button
          onClick={() => navigate("shop", { shopCategory: "all" })}
          className="mt-6 bg-gold text-onyx hover:bg-gold/90"
        >
          Explore Collection
        </Button>
      </div>
    );
  }

  return (
    <div className="py-10 lg:py-14 max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">Your Selection</p>
        <h1 className="font-display text-4xl md:text-5xl">Shopping Bag</h1>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        {/* Items */}
        <div>
          <div className="space-y-6">
            {cart.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-5 p-5 border border-border rounded-sm bg-card"
              >
                <button
                  onClick={() => item.type === "jewelry" && navigate("product", { productId: item.productId })}
                  className="w-28 h-28 bg-muted rounded-sm overflow-hidden flex-shrink-0"
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {item.metal ? `${item.metal} · ` : ""}
                        {item.carat ? `${item.carat}ct · ` : ""}
                        {item.type === "diamond" ? "Loose Diamond" : item.type === "custom" ? "Custom Design" : "Jewelry"}
                      </p>
                      <p className="text-sm font-medium mt-2">{formatPrice(item.priceUSD, currency)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <div className="flex items-center border border-border rounded-sm">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1.5 hover:bg-accent/40">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs w-8 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1.5 hover:bg-accent/40">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    {item.type !== "diamond" && (
                      <button
                        onClick={() => toggleGiftWrap(item.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-[10px] uppercase tracking-luxe-sm ${
                          item.giftWrap ? "border-gold text-gold" : "border-border text-muted-foreground"
                        }`}
                      >
                        <Gift className="w-3 h-3" /> Gift Wrap
                      </button>
                    )}
                    <button
                      onClick={() => toggleInsurance(item.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-[10px] uppercase tracking-luxe-sm ${
                        item.insurance ? "border-gold text-gold" : "border-border text-muted-foreground"
                      }`}
                    >
                      <Shield className="w-3 h-3" /> Insurance
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => navigate("shop", { shopCategory: "all" })}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mt-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </button>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="p-6 border border-border rounded-sm bg-card">
            <h3 className="font-display text-2xl mb-5">Order Summary</h3>

            {/* Coupon */}
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-2">Promo Code</p>
              <div className="flex gap-2">
                <Input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="LUXORA10"
                  className="h-9 text-xs"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (coupon.toUpperCase() === "LUXORA10") {
                      setApplied(true);
                      toast.success("Coupon applied: 10% off");
                    } else {
                      toast.error("Invalid promo code");
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-gold">
                  <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Discount</span>
                  <span>-{formatPrice(discount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1"><Truck className="w-3 h-3" /> Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span>{formatPrice(tax, currency)}</span>
              </div>
            </div>

            <Separator className="my-4" />
            <div className="flex justify-between font-display text-2xl">
              <span>Total</span>
              <span>{formatPrice(total, currency)}</span>
            </div>

            <Button
              onClick={() => navigate("checkout")}
              className="w-full mt-5 bg-gold text-onyx hover:bg-gold/90 h-12 tracking-luxe-sm uppercase text-xs"
            >
              Secure Checkout <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <div className="mt-4 text-[10px] text-muted-foreground space-y-1.5">
              <p className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-gold" /> 256-bit SSL secure checkout</p>
              <p className="flex items-center gap-1.5"><Truck className="w-3 h-3 text-gold" /> Free insured shipping over $5,000</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
