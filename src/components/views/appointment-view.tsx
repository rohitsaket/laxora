"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Video, Calendar, Clock, User, Check, ChevronRight, Phone, Mail } from "lucide-react";
import { STORES, getAppointmentSlots } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const APPT_TYPES = [
  { id: "in-store", label: "In-Boutique", desc: "Visit a LUXORA boutique for a private consultation", icon: MapPin },
  { id: "virtual", label: "Virtual", desc: "Meet a diamond consultant from anywhere", icon: Video },
];

export function AppointmentView() {
  const { navigate } = useStore();
  const [type, setType] = useState<"in-store" | "virtual">("in-store");
  const [storeId, setStoreId] = useState(STORES[0].id);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  const slots = getAppointmentSlots(storeId, 14);
  const grouped = slots.reduce<Record<string, typeof slots>>((acc, s) => {
    (acc[s.date] ??= []).push(s);
    return acc;
  }, {});
  const dates = Object.keys(grouped).slice(0, 7);

  const confirm = () => {
    if (!slot) {
      toast.error("Please select a time slot");
      return;
    }
    if (!form.name || !form.email) {
      toast.error("Please enter your name and email");
      return;
    }
    setConfirmed(true);
    toast.success("Appointment requested! Confirmation email sent.");
  };

  if (confirmed) {
    const s = slots.find((x) => x.id === slot);
    const store = STORES.find((x) => x.id === storeId);
    return (
      <div className="py-20 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center mb-6"
        >
          <Check className="w-9 h-9 text-gold" />
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Appointment Confirmed</h1>
        <p className="text-sm text-muted-foreground mb-8">
          We've sent a confirmation to {form.email}. A LUXORA concierge will reach out 24 hours before your appointment.
        </p>
        <div className="p-6 border border-border rounded-sm bg-card text-left max-w-md mx-auto">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span>{s?.type === "Virtual" ? "Virtual Consultation" : "In-Boutique"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Boutique</span><span>{store?.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{s && new Date(s.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span>{s?.time}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Consultant</span><span>{s?.staff}</span></div>
          </div>
        </div>
        <div className="flex gap-3 justify-center mt-8">
          <Button onClick={() => navigate("home")} variant="outline">Return Home</Button>
          <Button onClick={() => navigate("account")} className="bg-gold text-onyx hover:bg-gold/90">View My Appointments</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 lg:py-14 max-w-6xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">LUXORA Private Client</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">Book an Appointment</h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
          Meet with a LUXORA diamond consultant in person or virtually. Complimentary, no obligation, expertly guided.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div>
          {/* Type */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Appointment Type</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {APPT_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id as any)}
                  className={`p-5 border rounded-sm text-left transition ${
                    type === t.id ? "border-gold bg-gold/5" : "border-border hover:border-foreground/40"
                  }`}
                >
                  <t.icon className={`w-6 h-6 mb-2 ${type === t.id ? "text-gold" : "text-muted-foreground"}`} />
                  <p className="font-display text-lg">{t.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Store selection */}
          {type === "in-store" && (
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Select Boutique</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {STORES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setStoreId(s.id); setSlot(null); }}
                    className={`p-4 border rounded-sm text-left transition ${
                      storeId === s.id ? "border-gold bg-gold/5" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <p className="font-medium text-sm">{s.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.address}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{s.hours}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Calendar */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Select Date & Time</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {dates.map((d) => {
                const day = new Date(d);
                const slotsForDay = grouped[d];
                return (
                  <div
                    key={d}
                    className={`p-3 border rounded-sm text-center cursor-pointer transition ${
                      slots.find((s) => s.date === d && s.id === slot) ? "border-gold bg-gold/5" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <p className="text-[10px] uppercase text-muted-foreground">{day.toLocaleDateString("en-US", { weekday: "short" })}</p>
                    <p className="font-display text-2xl mt-1">{day.getDate()}</p>
                    <p className="text-[10px] text-muted-foreground">{day.toLocaleDateString("en-US", { month: "short" })}</p>
                    <div className="mt-2 space-y-1">
                      {slotsForDay.slice(0, 3).map((s) => (
                        <button
                          key={s.id}
                          onClick={(e) => { e.stopPropagation(); setSlot(s.id); }}
                          className={`block w-full text-[10px] py-1 rounded-sm transition ${
                            slot === s.id ? "bg-gold text-onyx" : "bg-secondary/60 hover:bg-secondary"
                          }`}
                        >
                          {s.time}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mb-3">Contact Information</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Full Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Notes (optional)</Label>
                <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="What are you looking for?" className="mt-1" />
              </div>
            </div>
          </div>

          <Button
            onClick={confirm}
            className="bg-gold text-onyx hover:bg-gold/90 h-12 px-10 tracking-luxe-sm uppercase text-xs"
          >
            Confirm Appointment <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="p-6 border border-border rounded-sm bg-card">
            <h3 className="font-display text-xl mb-4">Appointment Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                {type === "in-store" ? <MapPin className="w-4 h-4 text-gold mt-0.5" /> : <Video className="w-4 h-4 text-gold mt-0.5" />}
                <div>
                  <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Type</p>
                  <p>{type === "in-store" ? "In-Boutique" : "Virtual Consultation"}</p>
                </div>
              </div>
              {type === "in-store" && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Boutique</p>
                    <p>{STORES.find((s) => s.id === storeId)?.name}</p>
                    <p className="text-xs text-muted-foreground">{STORES.find((s) => s.id === storeId)?.address}</p>
                  </div>
                </div>
              )}
              {slot && (
                <>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gold mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Date & Time</p>
                      <p>
                        {(() => {
                          const s = slots.find((x) => x.id === slot);
                          return s ? `${new Date(s.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · ${s.time}` : "";
                        })()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-gold mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">Consultant</p>
                      <p>{slots.find((x) => x.id === slot)?.staff}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><Clock className="w-3 h-3 text-gold" /> 60-minute private consultation</p>
              <p className="flex items-center gap-2"><Check className="w-3 h-3 text-gold" /> Complimentary · No obligation</p>
              <p className="flex items-center gap-2"><Phone className="w-3 h-3 text-gold" /> Reschedule anytime</p>
              <p className="flex items-center gap-2"><Mail className="w-3 h-3 text-gold" /> Confirmation within 1 hour</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
