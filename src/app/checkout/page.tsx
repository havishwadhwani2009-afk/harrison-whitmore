"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart, type CartLine } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { getProductById, formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

type PaymentMethod = "card" | "apple-pay" | "google-pay";
type CheckoutItem = { line: CartLine; product: Product };

export default function CheckoutPage() {
  const { lines, clearCart, isReady } = useCart();
  const { addOrder, customer } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState(customer?.email ?? "");
  const [name, setName] = useState(customer?.name ?? "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [currency, setCurrency] = useState<"GBP" | "EUR">("GBP");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [giftCode, setGiftCode] = useState("");
  const [giftDiscount, setGiftDiscount] = useState(0);
  const [giftMessage, setGiftMessage] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  const items: CheckoutItem[] = lines
    .map((line) => ({ line, product: getProductById(line.productId) }))
    .filter((i): i is CheckoutItem => Boolean(i.product));

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.line.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = Math.max(0, subtotal + shipping - giftDiscount);

  function applyGiftCard() {
    const match = giftCode.trim().match(/^HW-(\d+)-/i);
    if (!match) {
      setGiftMessage("That gift card code could not be found.");
      setGiftDiscount(0);
      return;
    }
    const amount = Number(match[1]);
    setGiftDiscount(Math.min(amount, subtotal + shipping));
    setGiftMessage(`Gift card applied: ${formatPrice(Math.min(amount, subtotal + shipping))} credited.`);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setPlacing(true);
    setTimeout(() => {
      addOrder({
        id: `HW-${Date.now().toString().slice(-8)}`,
        date: new Date().toISOString(),
        status: "Processing",
        total,
        items: items.map((i) => ({
          name: i.product.name,
          size: i.line.size,
          color: i.line.color,
          quantity: i.line.quantity,
          price: i.product.price,
        })),
      });
      clearCart();
      router.push("/checkout/confirmation");
    }, 900);
  }

  if (isReady && items.length === 0 && !placing) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl">Nothing to check out</h1>
        <p className="mt-3 text-fg-muted">Your bag is currently empty.</p>
        <Link href="/men" className="mt-8 inline-block border border-fg px-7 py-3 text-sm tracking-wide hover:bg-overlay">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
      <h1 className="mb-10 font-display text-4xl">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-16 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 font-display text-xl">Contact</h2>
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
            />
            <p className="mt-2 text-xs text-fg-muted">
              Checking out as a guest.{" "}
              <Link href="/account" className="underline underline-offset-4">
                Sign in
              </Link>{" "}
              for faster checkout next time.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl">Shipping Address</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-border-strong bg-bg px-4 py-3 text-sm outline-none sm:col-span-2"
              />
              <input
                required
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-border-strong bg-bg px-4 py-3 text-sm outline-none sm:col-span-2"
              />
              <input
                required
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
              />
              <input
                required
                placeholder="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
              />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border border-border-strong bg-bg px-4 py-3 text-sm outline-none sm:col-span-2"
              >
                {["United Kingdom", "France", "Italy", "Germany", "United States", "Rest of World"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl">Payment</h2>
              <div className="flex gap-1 text-xs">
                {(["GBP", "EUR"] as const).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`border px-2 py-1 cursor-pointer ${currency === c ? "border-fg" : "border-border-strong text-fg-muted"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {(
                [
                  { id: "card", label: "Credit / Debit Card" },
                  { id: "apple-pay", label: "Apple Pay" },
                  { id: "google-pay", label: "Google Pay" },
                ] as { id: PaymentMethod; label: string }[]
              ).map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm ${
                    payment === m.id ? "border-fg" : "border-border-strong"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                  />
                  {m.label}
                </label>
              ))}
            </div>
            {payment === "card" && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Card number"
                  className="col-span-2 border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
                />
                <input required placeholder="MM / YY" className="border border-border-strong bg-bg px-4 py-3 text-sm outline-none" />
                <input required placeholder="CVC" className="border border-border-strong bg-bg px-4 py-3 text-sm outline-none" />
              </div>
            )}
            {payment !== "card" && (
              <p className="mt-3 text-xs text-fg-muted">
                You will be prompted to confirm with {payment === "apple-pay" ? "Apple Pay" : "Google Pay"} when you place your order.
              </p>
            )}
            <p className="mt-3 text-xs text-fg-muted">
              This is a simulated checkout for demonstration — no payment is actually processed.
            </p>
          </section>
        </div>

        <div className="h-fit border border-border p-6">
          <h2 className="mb-5 font-display text-xl">Order Summary</h2>
          <ul className="mb-4 space-y-3">
            {items.map((i) => (
              <li key={`${i.line.productId}-${i.line.size}-${i.line.color}`} className="flex justify-between text-sm">
                <span className="text-fg-muted">
                  {i.product.name} × {i.line.quantity}
                </span>
                <span>{formatPrice(i.product.price * i.line.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="my-4 hr-fine" />

          <div className="mb-3">
            <label className="mb-1.5 block text-xs text-fg-muted" htmlFor="gift-code">
              Redeem Gift Card
            </label>
            <div className="flex gap-2">
              <input
                id="gift-code"
                value={giftCode}
                onChange={(e) => setGiftCode(e.target.value)}
                placeholder="HW-100-XXXXXX"
                className="flex-1 border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
              />
              <button
                type="button"
                onClick={applyGiftCard}
                className="border border-border-strong px-3 py-2 text-sm cursor-pointer hover:bg-overlay"
              >
                Apply
              </button>
            </div>
            {giftMessage && <p className="mt-1.5 text-xs text-fg-muted">{giftMessage}</p>}
          </div>

          <div className="my-4 hr-fine" />

          <div className="flex justify-between text-sm">
            <span className="text-fg-muted">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-fg-muted">Shipping</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          {giftDiscount > 0 && (
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-fg-muted">Gift Card</span>
              <span>-{formatPrice(giftDiscount)}</span>
            </div>
          )}
          <div className="my-4 hr-fine" />
          <div className="flex justify-between text-base">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <button
            type="submit"
            disabled={placing || items.length === 0}
            className="mt-6 w-full bg-accent py-3.5 text-sm tracking-wide text-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {placing ? "Placing Order…" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
