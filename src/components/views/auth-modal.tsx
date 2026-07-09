"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Sparkles, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen, signIn, navigate } = useStore();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const close = () => {
    setAuthModalOpen(false);
    // Defer reset until after the modal closes
    setTimeout(() => {
      setForm({ name: "", email: "", password: "" });
      setMode("signin");
    }, 300);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    const name = mode === "signup" ? form.name || "Valued Client" : form.email.split("@")[0].replace(/\W/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    signIn(form.email, name);
    toast.success(mode === "signin" ? "Welcome back to LUXORA" : "Welcome to LUXORA");
    setAuthModalOpen(false);
    navigate("account");
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-onyx/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background border border-border rounded-sm max-w-md w-full overflow-hidden"
          >
            {/* Hero side */}
            <div className="relative h-28 bg-gradient-to-br from-onyx to-secondary/40 flex items-center justify-center">
              <div className="absolute inset-0 bg-radial-luxe opacity-50" />
              <div className="text-center relative">
                <p className="text-[10px] uppercase tracking-luxe text-gold">LUXORA Privé</p>
                <p className="font-display text-2xl">The Inner Circle</p>
              </div>
              <button
                onClick={close}
                className="absolute top-3 right-3 text-foreground/60 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-7">
              <div className="flex gap-2 mb-6 p-1 bg-secondary/40 rounded-sm">
                <button
                  onClick={() => setMode("signin")}
                  className={`flex-1 py-2 text-xs uppercase tracking-luxe-sm rounded-sm transition ${
                    mode === "signin" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`flex-1 py-2 text-xs uppercase tracking-luxe-sm rounded-sm transition ${
                    mode === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <h2 className="font-display text-2xl mb-1">
                {mode === "signin" ? "Welcome back" : "Join the maison"}
              </h2>
              <p className="text-xs text-muted-foreground mb-5">
                {mode === "signin"
                  ? "Access your orders, wishlist, and loyalty benefits."
                  : "Unlock private appointments, early access, and member rewards."}
              </p>

              <form onSubmit={submit} className="space-y-3">
                {mode === "signup" && (
                  <div>
                    <Label className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Full Name</Label>
                    <div className="relative mt-1">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="pl-9"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <Label className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="pl-9"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="pl-9"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold text-onyx hover:bg-gold/90 h-11 tracking-luxe-sm uppercase text-xs mt-2"
                >
                  {mode === "signin" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>

              <div className="my-5 flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Or</span>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-10 text-xs" onClick={() => toast.info("Social sign-in is a demo only")}>
                  Google
                </Button>
                <Button variant="outline" size="sm" className="h-10 text-xs" onClick={() => toast.info("Social sign-in is a demo only")}>
                  Apple
                </Button>
              </div>

              <p className="text-[10px] text-muted-foreground text-center mt-5 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-gold" />
                By continuing, you agree to LUXORA's Terms & Privacy Policy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
