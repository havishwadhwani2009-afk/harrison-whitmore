"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type RecentlyViewedContextValue = {
  ids: string[];
  recordView: (productId: string) => void;
};

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(undefined);
const STORAGE_KEY = "hw-recently-viewed";
const MAX_ENTRIES = 8;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
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

  function recordView(productId: string) {
    setIds((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX_ENTRIES));
  }

  return (
    <RecentlyViewedContext.Provider value={{ ids, recordView }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
}
