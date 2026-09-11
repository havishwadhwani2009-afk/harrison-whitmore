"use client";

import { useState } from "react";
import { SceneArt } from "@/components/scene-art";
import { formatPrice } from "@/lib/products";

const AMOUNTS = [50, 100, 200, 500];

function generateCode(amount: number) {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `HW-${amount}-${random}`;
}

export default function GiftCardsPage() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [code, setCode] = useState<string | null>(null);

  const finalAmount = customAmount ? Number(customAmount) || 0 : amount;

  function handlePurchase() {
    if (finalAmount < 10) return;
    setCode(generateCode(finalAmount));
  }

  if (code) {
    return (
      <div className="mx-auto max-w-lg px-6 py-28 text-center">
        <p className="text-sm tracking-[0.15em] text-fg-muted">GIFT CARD PURCHASED</p>
        <h1 className="mt-2 font-display text-3xl">{formatPrice(finalAmount)} Gift Card</h1>
        <p className="mt-4 text-fg-muted">
          {recipientEmail
            ? `A confirmation has been sent to ${recipientEmail}.`
            : "Keep this code safe — it can be redeemed at checkout."}
        </p>
        <p className="mt-6 border border-border-strong px-6 py-4 font-display text-2xl tracking-widest">
          {code}
        </p>
        <p className="mt-6 text-xs text-fg-muted">
          Enter this code under &ldquo;Redeem Gift Card&rdquo; at checkout to apply it to an order.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md">
          <SceneArt variant="townhouse" tone="navy" className="absolute inset-0 h-full w-full" label="Harrison Whitmore gift card" />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-8">
            <span className="font-display text-2xl text-white">The Harrison Whitmore Gift Card</span>
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl">Gift Cards</h1>
          <p className="mt-3 text-fg-muted">
            A quietly generous gift, redeemable across the full collection. Delivered digitally,
            with no expiry.
          </p>

          <p className="mb-2 mt-8 text-sm">Select an amount</p>
          <div className="grid grid-cols-4 gap-2">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setAmount(a);
                  setCustomAmount("");
                }}
                className={`border py-3 text-sm cursor-pointer ${
                  amount === a && !customAmount ? "border-fg" : "border-border-strong text-fg-muted"
                }`}
              >
                {formatPrice(a)}
              </button>
            ))}
          </div>

          <label className="mb-2 mt-4 block text-sm" htmlFor="custom-amount">
            Or enter a custom amount
          </label>
          <input
            id="custom-amount"
            type="number"
            min={10}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="£"
            className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
          />

          <label className="mb-2 mt-5 block text-sm" htmlFor="recipient-email">
            Recipient email (optional)
          </label>
          <input
            id="recipient-email"
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full border border-border-strong bg-bg px-4 py-3 text-sm outline-none"
          />

          <button
            type="button"
            onClick={handlePurchase}
            disabled={finalAmount < 10}
            className="mt-8 w-full bg-accent py-3.5 text-sm tracking-wide text-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            Purchase Gift Card — {formatPrice(finalAmount || 0)}
          </button>
        </div>
      </div>
    </div>
  );
}
