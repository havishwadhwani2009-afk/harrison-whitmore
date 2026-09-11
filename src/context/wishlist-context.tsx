"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type WishlistContextValue = {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  isReady: boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = "hw-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // One-time hydration from localStorage after mount — avoids an SSR/client
      // hydration mismatch, since localStorage isn't available on the server.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setIds(JSON.parse(stored));
    } catch {
      // ignore corrupt storage
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids, isReady]);

  const toggle = (productId: string) => {
    setIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const has = (productId: string) => ids.includes(productId);

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, isReady }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
