"use client";

import * as React from "react";
import { useStore, useStoreSelector } from "@/lib/store";

/**
 * Hydrates the Zustand store from localStorage on mount so cart / wishlist /
 * recently-viewed / theme persist across reloads. Wraps the whole app so any
 * view can read persisted state.
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useStore((s) => s.hydrate);
  React.useEffect(() => {
    hydrate();
    // Subscribe to changes -> persist
    const unsub = useStore.subscribe((state) => {
      try {
        localStorage.setItem(
          "luxora-state",
          JSON.stringify({
            cart: state.cart,
            wishlist: state.wishlist,
            recentlyViewed: state.recentlyViewed,
            auth: state.auth,
          })
        );
      } catch {
        /* ignore */
      }
    });
    return unsub;
  }, []);

  // Touch selector to silence unused warning while keeping import intact
  useStoreSelector((s) => s.view);

  return <>{children}</>;
}
