"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CartLine = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  removeLine: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  isReady: boolean;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "hw-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // One-time hydration from localStorage after mount — avoids an SSR/client
      // hydration mismatch, since localStorage isn't available on the server.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setLines(JSON.parse(stored));
    } catch {
      // ignore corrupt storage
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, isReady]);

  const addLine: CartContextValue["addLine"] = (line, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.productId === line.productId && l.size === line.size && l.color === line.color
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { ...line, quantity }];
    });
  };

  const removeLine: CartContextValue["removeLine"] = (productId, size, color) => {
    setLines((prev) =>
      prev.filter((l) => !(l.productId === productId && l.size === size && l.color === color))
    );
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (productId, size, color, quantity) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.productId === productId && l.size === size && l.color === color
            ? { ...l, quantity }
            : l
        )
        .filter((l) => l.quantity > 0)
    );
  };

  const clearCart = () => setLines([]);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <CartContext.Provider
      value={{ lines, addLine, removeLine, updateQuantity, clearCart, count, isReady }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
