"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { formatPrice } from "@/lib/products";

function statusColor(status: string) {
  if (status === "Delivered") return "text-fg";
  if (status === "Shipped") return "text-fg-muted";
  return "text-fg-muted";
}

function AccountForm() {
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(
    searchParams.get("tab") === "register" ? "register" : "login"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    login({ name: name || email.split("@")[0], email });
  }

  return (
    <div className="mx-auto max-w-md px-6 py-24 md:py-32">
      <div className="mb-8 flex gap-6 border-b border-border">
        {(["login", "register"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-1 pb-3 font-display text-xl cursor-pointer ${
              tab === t ? "border-fg" : "border-transparent text-fg-muted"
            }`}
          >
            {t === "login" ? "Sign In" : "Create Account"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === "register" && (
          <input
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
          />
        )}
        <input
          required
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
        />
        <button
          type="submit"
          className="w-full bg-accent py-3.5 text-sm tracking-wide text-on-accent transition-opacity hover:opacity-90 cursor-pointer"
        >
          {tab === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-fg-muted">
        This is a demonstration account system — no real authentication is performed.
      </p>
    </div>
  );
}

function AccountDashboard() {
  const { customer, logout, orders } = useAuth();
  if (!customer) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-fg-muted">Welcome back,</p>
          <h1 className="font-display text-3xl">{customer.name}</h1>
        </div>
        <button
          type="button"
          onClick={logout}
          className="border border-border-strong px-5 py-2.5 text-sm text-fg-muted hover:text-fg cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      <h2 className="mb-4 font-display text-xl">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-fg-muted">You have not placed an order yet.</p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {orders.map((order) => (
            <li key={order.id} className="py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-display text-lg">{order.id}</p>
                  <p className="text-sm text-fg-muted">
                    {new Date(order.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${statusColor(order.status)}`}>{order.status}</p>
                  <p className="text-sm">{formatPrice(order.total)}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1">
                {order.items.map((item, i) => (
                  <li key={i} className="text-sm text-fg-muted">
                    {item.name} ({item.color}, {item.size}) × {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AccountPage() {
  const { customer, isReady } = useAuth();
  if (!isReady) return null;

  return (
    <Suspense fallback={null}>
      {customer ? <AccountDashboard /> : <AccountForm />}
    </Suspense>
  );
}
