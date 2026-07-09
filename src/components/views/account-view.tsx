"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  ShoppingBag,
  Heart,
  Calendar,
  Award,
  Download,
  LogOut,
  Settings,
  Bell,
  Package,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";
import { useStore, formatPrice } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS } from "@/lib/data";
import { toast } from "sonner";

const TABS = [
  { value: "overview", label: "Overview", icon: User },
  { value: "orders", label: "Orders", icon: Package },
  { value: "wishlist", label: "Wishlist", icon: Heart },
  { value: "appointments", label: "Appointments", icon: Calendar },
  { value: "certificates", label: "Certificates", icon: Award },
  { value: "loyalty", label: "Loyalty", icon: Award },
];

const mockOrders = [
  {
    id: "LX-20240712",
    date: "Jul 12, 2024",
    status: "Delivered",
    total: 8450,
    items: [{ name: "Solitaire Céleste Engagement Ring", qty: 1, image: PRODUCTS[0].images[0] }],
  },
  {
    id: "LX-20240528",
    date: "May 28, 2024",
    status: "In Transit",
    total: 4200,
    items: [{ name: "Éternelle Diamond Eternity Band", qty: 1, image: PRODUCTS[8].images[0] }],
  },
  {
    id: "LX-20240214",
    date: "Feb 14, 2024",
    status: "Delivered",
    total: 5600,
    items: [{ name: "Céleste Diamond Pendant", qty: 1, image: PRODUCTS[15].images[0] }],
  },
];

const mockAppointments = [
  { id: "apt-1", date: "Aug 18, 2024", time: "12:00 PM", type: "In-Store", store: "LUXORA New York", staff: "Sophie Bernard" },
  { id: "apt-2", date: "Sep 05, 2024", time: "3:30 PM", type: "Virtual", store: "Virtual Consultation", staff: "Marcus Vermeer" },
];

export function AccountView() {
  const { auth, signOut, navigate, wishlist, setAuthModalOpen, currency } = useStore();
  const [tab, setTab] = useState("overview");

  if (!auth.user) {
    return (
      <div className="py-32 text-center">
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-3xl">Sign in to view your account</h1>
        <p className="text-sm text-muted-foreground mt-2">Access orders, wishlist, appointments and loyalty benefits.</p>
        <Button onClick={() => setAuthModalOpen(true)} className="mt-6 bg-gold text-onyx hover:bg-gold/90">
          Sign In
        </Button>
      </div>
    );
  }

  const user = auth.user;
  const tierColors: Record<string, string> = {
    Silver: "from-gray-400 to-gray-500",
    Gold: "from-yellow-500 to-amber-500",
    Platinum: "from-zinc-300 to-zinc-400",
    Diamond: "from-cyan-300 to-blue-300",
  };

  return (
    <div className="py-10 lg:py-14 max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-wrap items-center gap-6"
      >
        <div className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold/40 flex items-center justify-center text-gold font-display text-2xl">
          {user.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-3xl md:text-4xl">Welcome, {user.name.split(" ")[0]}</h1>
            <span className={`px-3 py-1 text-[10px] uppercase tracking-luxe-sm rounded-full bg-gradient-to-r ${tierColors[user.loyaltyTier]} text-onyx font-medium`}>
              {user.loyaltyTier} Member
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          <p className="text-xs text-gold mt-1">{user.loyaltyPoints} loyalty points · {Math.floor(user.loyaltyPoints / 100)} rewards available</p>
        </div>
        <Button variant="outline" size="sm" onClick={signOut}>
          <LogOut className="w-3.5 h-3.5 mr-1.5" /> Sign Out
        </Button>
      </motion.div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start overflow-x-auto border-b border-border rounded-none bg-transparent h-auto p-0 mb-8">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent text-xs uppercase tracking-luxe-sm py-3 px-4 flex items-center gap-1.5"
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Package} label="Total Orders" value="3" />
            <StatCard icon={Heart} label="Wishlist Items" value={String(wishlist.length)} />
            <StatCard icon={Calendar} label="Upcoming Appointments" value="2" />
            <StatCard icon={Award} label="Loyalty Points" value={String(user.loyaltyPoints)} />
          </div>

          <div className="mt-8 p-6 border border-border rounded-sm bg-card">
            <h3 className="font-display text-xl mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockOrders.slice(0, 2).map((o) => (
                <div key={o.id} className="flex items-center gap-4 p-3 border border-border rounded-sm">
                  <Package className="w-5 h-5 text-gold" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Order {o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.date} · {o.items[0].name}</p>
                  </div>
                  <Badge variant="secondary" className={o.status === "Delivered" ? "bg-green-500/15 text-green-600" : "bg-amber-500/15 text-amber-600"}>
                    {o.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-5">
            {mockOrders.map((o) => (
              <div key={o.id} className="p-5 border border-border rounded-sm bg-card">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-display text-lg">Order {o.id}</p>
                    <p className="text-xs text-muted-foreground">Placed on {o.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={o.status === "Delivered" ? "bg-green-500/15 text-green-600" : "bg-amber-500/15 text-amber-600"}>
                      {o.status === "Delivered" ? <CheckCircle className="w-3 h-3 mr-1" /> : <Truck className="w-3 h-3 mr-1" />}
                      {o.status}
                    </Badge>
                    <span className="text-sm font-medium">{formatPrice(o.total, currency)}</span>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="space-y-3">
                  {o.items.map((it, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-14 h-14 bg-muted rounded-sm overflow-hidden">
                        <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{it.name}</p>
                        <p className="text-xs text-muted-foreground">Qty {it.qty}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate("product", { productId: PRODUCTS[0].id })}>
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => toast.success("Invoice downloaded")}>
                    <Download className="w-3.5 h-3.5 mr-1" /> Invoice
                  </Button>
                  {o.status === "Delivered" && (
                    <Button size="sm" variant="outline">Start Return</Button>
                  )}
                  <Button size="sm" variant="outline">Track Shipment</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRODUCTS.filter((p) => wishlist.includes(p.id)).map((p) => (
              <button
                key={p.id}
                onClick={() => navigate("product", { productId: p.id })}
                className="group text-left"
              >
                <div className="aspect-square bg-muted rounded-sm overflow-hidden mb-2">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <p className="text-xs font-medium truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{formatPrice(p.priceUSD, currency)}</p>
              </button>
            ))}
            {wishlist.filter((id) => id.startsWith("dia-")).length > 0 && (
              <button
                onClick={() => navigate("diamonds")}
                className="aspect-square border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center text-xs text-muted-foreground hover:border-gold hover:text-gold transition"
              >
                <Heart className="w-6 h-6 mb-2" />
                {wishlist.filter((id) => id.startsWith("dia-")).length} saved diamonds
              </button>
            )}
            {wishlist.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <Heart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No saved items yet.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <div className="space-y-4">
            {mockAppointments.map((a) => (
              <div key={a.id} className="p-5 border border-border rounded-sm bg-card flex flex-wrap items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{a.date} · {a.time}</p>
                  <p className="text-xs text-muted-foreground">{a.type} · {a.store} · with {a.staff}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.success("Reschedule link sent")}>
                  Reschedule
                </Button>
                <Button size="sm" variant="outline" className="text-destructive">
                  Cancel
                </Button>
              </div>
            ))}
            <Button
              onClick={() => navigate("appointments")}
              className="bg-gold text-onyx hover:bg-gold/90"
            >
              Book Another Appointment
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <div className="space-y-4">
            {mockOrders.slice(0, 2).map((o) => (
              <div key={o.id} className="p-5 border border-border rounded-sm bg-card flex items-center gap-4">
                <Award className="w-10 h-10 text-gold" />
                <div className="flex-1">
                  <p className="font-medium">GIA Certificate · {o.id}</p>
                  <p className="text-xs text-muted-foreground">Issued {o.date} · Verified authentic</p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-3.5 h-3.5 mr-1" /> Download
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="loyalty">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-gold/30 bg-gold/5 rounded-sm">
              <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">{user.loyaltyTier} Member</p>
              <p className="font-display text-5xl">{user.loyaltyPoints}</p>
              <p className="text-sm text-muted-foreground mt-1">Loyalty Points</p>
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground">
                You have <span className="text-gold font-medium">{Math.floor(user.loyaltyPoints / 100)}</span> reward credits available.
                Each credit equals $25 toward a future purchase.
              </p>
              <Button className="mt-4 bg-gold text-onyx hover:bg-gold/90">Redeem Rewards</Button>
            </div>
            <div className="p-6 border border-border rounded-sm">
              <p className="text-[10px] uppercase tracking-luxe text-gold mb-3">Member Benefits</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Early access to new collections",
                  "Private appointment priority",
                  "Complimentary engraving",
                  "Annual cleaning & re-polishing",
                  "Exclusive event invitations",
                  "Birthday gift & anniversary credits",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-5 border border-border rounded-sm bg-card">
      <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-3">
        <Icon className="w-4 h-4 text-gold" />
      </div>
      <p className="font-display text-2xl">{value}</p>
      <p className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
