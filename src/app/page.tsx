"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeView } from "@/components/views/home-view";
import { ShopView } from "@/components/views/shop-view";
import { ProductDetailView } from "@/components/views/product-detail-view";
import { DiamondSearchView } from "@/components/views/diamond-search-view";
import { CartView } from "@/components/views/cart-view";
import { CheckoutView } from "@/components/views/checkout-view";
import { WishlistView } from "@/components/views/wishlist-view";
import { AccountView } from "@/components/views/account-view";
import { BuilderView } from "@/components/views/builder-view";
import { AppointmentView } from "@/components/views/appointment-view";
import { EducationView } from "@/components/views/education-view";
import { AuthModal } from "@/components/views/auth-modal";
import { AIAssistant } from "@/components/ai/ai-assistant";

export default function Page() {
  const { nav } = useStore();

  const renderView = () => {
    switch (nav.view) {
      case "home": return <HomeView />;
      case "shop": return <ShopView />;
      case "product": return <ProductDetailView />;
      case "diamonds": return <DiamondSearchView />;
      case "cart": return <CartView />;
      case "checkout": return <CheckoutView />;
      case "wishlist": return <WishlistView />;
      case "account": return <AccountView />;
      case "builder": return <BuilderView />;
      case "appointments": return <AppointmentView />;
      case "education": return <EducationView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={nav.view + (nav.productId ?? "") + (nav.shopCategory ?? "") + (nav.shopCollection ?? "")}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AuthModal />
      <AIAssistant />
    </div>
  );
}
