"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Customer = {
  name: string;
  email: string;
};

export type Address = {
  line1: string;
  city: string;
  postcode: string;
  country: string;
};

export type Order = {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
  items: { name: string; size: string; color: string; quantity: number; price: number }[];
};

type AuthContextValue = {
  customer: Customer | null;
  login: (customer: Customer) => void;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const CUSTOMER_KEY = "hw-customer";
const ORDERS_KEY = "hw-orders";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      // One-time hydration from localStorage after mount — avoids an SSR/client
      // hydration mismatch, since localStorage isn't available on the server.
      const storedCustomer = window.localStorage.getItem(CUSTOMER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedCustomer) setCustomer(JSON.parse(storedCustomer));
      const storedOrders = window.localStorage.getItem(ORDERS_KEY);
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch {
      // ignore corrupt storage
    }
    setIsReady(true);
  }, []);

  const login = (c: Customer) => {
    setCustomer(c);
    window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify(c));
  };

  const logout = () => {
    setCustomer(null);
    window.localStorage.removeItem(CUSTOMER_KEY);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const next = [order, ...prev];
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ customer, login, logout, orders, addOrder, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
