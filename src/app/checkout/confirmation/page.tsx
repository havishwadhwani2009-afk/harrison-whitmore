"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { formatPrice } from "@/lib/products";

export default function ConfirmationPage() {
  const { orders, isReady } = useAuth();
  const order = orders[0];

  if (isReady && !order) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl">No recent order found</h1>
        <Link href="/" className="mt-8 inline-block border border-fg px-7 py-3 text-sm tracking-wide hover:bg-overlay">
          Return Home
        </Link>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center md:py-32">
      <p className="text-sm tracking-[0.15em] text-fg-muted">ORDER CONFIRMED</p>
      <h1 className="mt-2 font-display text-4xl">Thank you.</h1>
      <p className="mt-4 text-fg-muted">
        Your order <span className="text-fg">{order.id}</span> has been placed. A confirmation has
        been sent to your email, and you may track its progress from your account.
      </p>

      <div className="mt-10 border border-border p-6 text-left">
        <ul className="space-y-3">
          {order.items.map((item, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span className="text-fg-muted">
                {item.name} ({item.color}, {item.size}) × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="my-4 hr-fine" />
        <div className="flex justify-between text-base">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <Link href="/account" className="border border-fg px-7 py-3 text-sm tracking-wide hover:bg-overlay">
          View Order History
        </Link>
        <Link href="/" className="border border-border-strong px-7 py-3 text-sm tracking-wide text-fg-muted hover:text-fg">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
