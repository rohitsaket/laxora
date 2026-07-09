"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Truck, Shield, Lock, ChevronRight, ArrowLeft, Apple, Smartphone, Wallet } from "lucide-react";
import { useStore, formatPrice } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const STEPS = ["Information", "Shipping", "Payment", "Review"];

export function CheckoutView() {
  const { cart, cartSubtotal, navigate, clearCart, currency, auth } = useStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: auth.user?.email ?? "",
    firstName: auth.user?.name.split(" ")[0] ?? "",
    lastName: auth.user?.name.split(" ")[1] ?? "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    shippingMethod: "fedex-priority",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const subtotal = cartSubtotal();
  const shipping = subtotal > 5000 ? 0 : 75;
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + shipping + tax;

  if (cart.length === 0 && step < 3) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-display text-3xl">Nothing to check out</h1>
        <Button onClick={() => navigate("shop", { shopCategory: "all" })} className="mt-6 bg-gold text-onyx">
          Explore Collection
        </Button>
      </div>
    );
  }

  const next = () => {
    if (step === 0 && (!form.email || !form.firstName || !form.address1)) {
      toast.error("Please complete all required fields");
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const placeOrder = () => {
    const orderId = `LX-${Date.now().toString().slice(-8)}`;
    clearCart();
    navigate("account");
    toast.success(`Order ${orderId} placed successfully!`);
  };

  return (
    <div className="py-10 lg:py-14 max-w-6xl mx-auto px-6">
      <button
        onClick={() => navigate("cart")}
        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Bag
      </button>

      <h1 className="font-display text-4xl md:text-5xl mb-2">Secure Checkout</h1>
      <p className="text-sm text-muted-foreground mb-8 flex items-center gap-1.5">
        <Lock className="w-3.5 h-3.5 text-gold" /> 256-bit SSL encrypted · Your information is protected
      </p>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${
              i < step ? "bg-gold text-onyx border-gold" : i === step ? "border-gold text-gold" : "border-border text-muted-foreground"
            }`}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={`text-[10px] uppercase tracking-luxe-sm ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-gold" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl">Contact & Shipping Address</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email" value={form.email} onChange={(v) => set("email", v)} type="email" />
                    <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="First Name" value={form.firstName} onChange={(v) => set("firstName", v)} />
                    <Field label="Last Name" value={form.lastName} onChange={(v) => set("lastName", v)} />
                  </div>
                  <Field label="Address Line 1" value={form.address1} onChange={(v) => set("address1", v)} />
                  <Field label="Address Line 2 (optional)" value={form.address2} onChange={(v) => set("address2", v)} />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="City" value={form.city} onChange={(v) => set("city", v)} />
                    <Field label="State / Province" value={form.state} onChange={(v) => set("state", v)} />
                    <Field label="Postal Code" value={form.zip} onChange={(v) => set("zip", v)} />
                  </div>
                  <Field label="Country" value={form.country} onChange={(v) => set("country", v)} />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-display text-2xl">Shipping Method</h2>
                  <RadioGroup value={form.shippingMethod} onValueChange={(v) => set("shippingMethod", v)}>
                    {[
                      { id: "fedex-priority", label: "FedEx Priority Overnight", desc: "1–2 business days · Insured", price: subtotal > 5000 ? 0 : 75 },
                      { id: "fedex-2day", label: "FedEx 2-Day", desc: "2–3 business days · Insured", price: subtotal > 5000 ? 0 : 45 },
                      { id: "white-glove", label: "White Glove Delivery", desc: "Personal courier · 3–5 days", price: 250 },
                      { id: "pickup", label: "Boutique Pickup", desc: "Collect at any LUXORA boutique", price: 0 },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition ${
                          form.shippingMethod === opt.id ? "border-gold bg-gold/5" : "border-border"
                        }`}
                      >
                        <RadioGroupItem value={opt.id} id={opt.id} />
                        <Truck className="w-5 h-5 text-gold" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                        <span className="text-sm font-medium">
                          {opt.price === 0 ? "Free" : formatPrice(opt.price, currency)}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-display text-2xl">Payment Method</h2>
                  <RadioGroup value={form.paymentMethod} onValueChange={(v) => set("paymentMethod", v)}>
                    {[
                      { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                      { id: "apple-pay", label: "Apple Pay", icon: Apple },
                      { id: "google-pay", label: "Google Pay", icon: Wallet },
                      { id: "upi", label: "UPI (India)", icon: Smartphone },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition ${
                          form.paymentMethod === opt.id ? "border-gold bg-gold/5" : "border-border"
                        }`}
                      >
                        <RadioGroupItem value={opt.id} id={opt.id} />
                        <opt.icon className="w-5 h-5 text-gold" />
                        <span className="text-sm font-medium flex-1">{opt.label}</span>
                      </label>
                    ))}
                  </RadioGroup>

                  {form.paymentMethod === "card" && (
                    <div className="space-y-4 p-5 border border-border rounded-sm bg-secondary/30">
                      <Field label="Card Number" value={form.cardNumber} onChange={(v) => set("cardNumber", v)} placeholder="1234 5678 9012 3456" />
                      <Field label="Name on Card" value={form.cardName} onChange={(v) => set("cardName", v)} />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Expiry (MM/YY)" value={form.cardExpiry} onChange={(v) => set("cardExpiry", v)} placeholder="12/27" />
                        <Field label="CVC" value={form.cardCvc} onChange={(v) => set("cardCvc", v)} placeholder="123" />
                      </div>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                        <Lock className="w-3 h-3" /> This is a demo — do not enter real card information.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl">Review Your Order</h2>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border border-border rounded-sm">
                        <div className="w-16 h-16 bg-muted rounded-sm overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.metal ? `${item.metal} · ` : ""}Qty {item.qty}
                          </p>
                        </div>
                        <p className="text-sm font-medium">{formatPrice(item.priceUSD * item.qty, currency)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 border border-border rounded-sm bg-secondary/30 space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Contact</span><span>{form.email}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Ship to</span><span className="text-right">{form.address1}, {form.city}, {form.state} {form.zip}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{form.shippingMethod === "fedex-priority" ? "FedEx Priority" : form.shippingMethod === "white-glove" ? "White Glove" : form.shippingMethod === "pickup" ? "Boutique Pickup" : "FedEx 2-Day"}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span>{form.paymentMethod === "card" ? `Card ending ${form.cardNumber.slice(-4) || "••••"}` : form.paymentMethod}</span></div>
                  </div>

                  <div className="p-5 border border-gold/30 bg-gold/5 rounded-sm flex items-start gap-3">
                    <Shield className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground/80">
                      By placing this order, you agree to LUXORA's Terms of Service and Privacy Policy.
                      Your piece will be hand-finished and shipped within 3–5 business days, fully insured.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button variant="outline" onClick={back} className="h-11">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={next} className="bg-onyx text-foreground hover:bg-onyx/90 h-11 flex-1 sm:flex-none sm:px-12">
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={placeOrder} className="bg-gold text-onyx hover:bg-gold/90 h-11 flex-1 sm:flex-none sm:px-12 tracking-luxe-sm uppercase text-xs">
                Place Order · {formatPrice(total, currency)}
              </Button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="p-6 border border-border rounded-sm bg-card">
            <h3 className="font-display text-xl mb-4">Order Summary</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 bg-muted rounded-sm overflow-hidden flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1.5 -right-1.5 bg-gold text-onyx text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.metal}</p>
                  </div>
                  <p className="text-xs font-medium">{formatPrice(item.priceUSD * item.qty, currency)}</p>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal, currency)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping, currency)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{formatPrice(tax, currency)}</span></div>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-display text-xl">
              <span>Total</span>
              <span>{formatPrice(total, currency)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10"
      />
    </div>
  );
}
