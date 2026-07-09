"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useStore, formatPrice } from "@/lib/store";
import { X, Plus, Minus, ShoppingBag, Gift, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const {
    cartOpen,
    setCartOpen,
    cart,
    updateQty,
    removeFromCart,
    toggleGiftWrap,
    toggleInsurance,
    cartSubtotal,
    navigate,
    currency,
  } = useStore();

  const subtotal = cartSubtotal();
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 75;
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + shipping + tax;

  return (
    <>
      <span onClick={() => setCartOpen(true)} className="inline-flex">
        {children}
      </span>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b border-border flex-row items-center justify-between space-y-0">
            <SheetTitle className="font-display text-xl tracking-luxe flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-gold" />
              Shopping Bag ({cart.length})
            </SheetTitle>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-display text-xl">Your bag is empty</p>
                <p className="text-sm text-muted-foreground mt-1">Discover timeless pieces crafted to last.</p>
              </div>
              <Button
                className="bg-onyx text-foreground hover:bg-onyx/90"
                onClick={() => {
                  setCartOpen(false);
                  navigate("shop", { shopCategory: "all" });
                }}
              >
                Explore Collection
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {item.metal ? `${item.metal} · ` : ""}
                            {item.carat ? `${item.carat}ct · ` : ""}
                            {item.type === "diamond" ? "Loose Diamond" : item.type === "custom" ? "Custom Design" : "Jewelry"}
                          </p>
                        </div>
                        <button
                          aria-label="Remove"
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-sm">
                          <button
                            className="p-1.5 hover:bg-accent/40"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs w-8 text-center">{item.qty}</span>
                          <button
                            className="p-1.5 hover:bg-accent/40"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-medium">{formatPrice(item.priceUSD * item.qty, currency)}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2 text-[10px]">
                        {item.type !== "diamond" && (
                          <button
                            onClick={() => toggleGiftWrap(item.id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded border ${
                              item.giftWrap ? "border-gold text-gold" : "border-border text-muted-foreground"
                            }`}
                          >
                            <Gift className="w-3 h-3" /> Gift wrap
                          </button>
                        )}
                        <button
                          onClick={() => toggleInsurance(item.id)}
                          className={`flex items-center gap-1 px-2 py-1 rounded border ${
                            item.insurance ? "border-gold text-gold" : "border-border text-muted-foreground"
                          }`}
                        >
                          <Shield className="w-3 h-3" /> Insurance
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border px-6 py-4 space-y-3 bg-muted/30">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping, currency)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Estimated tax</span>
                  <span>{formatPrice(tax, currency)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-display text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
                <Button
                  className="w-full bg-gold text-onyx hover:bg-gold/90 h-11 tracking-luxe-sm uppercase text-xs"
                  onClick={() => {
                    setCartOpen(false);
                    navigate("checkout");
                  }}
                >
                  Proceed to Checkout
                </Button>
                <button
                  className="w-full text-xs text-center text-muted-foreground hover:text-foreground"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
