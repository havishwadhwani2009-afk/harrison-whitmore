"use client";

import Link from "next/link";
import { useCart, type CartLine } from "@/context/cart-context";
import { getProductById, formatPrice } from "@/lib/products";
import { GarmentArt } from "@/components/garment-art";
import { MinusIcon, PlusIcon, CloseIcon } from "@/components/icons";
import type { Product } from "@/lib/types";

type CartItem = { line: CartLine; product: Product };

export default function CartPage() {
  const { lines, updateQuantity, removeLine, isReady } = useCart();

  const items: CartItem[] = lines
    .map((line) => ({ line, product: getProductById(line.productId) }))
    .filter((i): i is CartItem => Boolean(i.product));

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.line.quantity, 0);

  if (isReady && items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl">Your bag is empty</h1>
        <p className="mt-3 text-fg-muted">Pieces you add will appear here.</p>
        <Link href="/men" className="mt-8 inline-block border border-fg px-7 py-3 text-sm tracking-wide hover:bg-overlay">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
      <h1 className="mb-10 font-display text-4xl">Shopping Bag</h1>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-border">
          {items.map(({ line, product }) => (
            <li key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-5 py-6">
              <Link href={`/product/${product.slug}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-bg-sunken">
                <GarmentArt subcategory={product.subcategory} tone={product.tone} className="h-full w-full" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/product/${product.slug}`} className="font-display text-lg">
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-fg-muted">
                      {line.color} · Size {line.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.productId, line.size, line.color)}
                    aria-label="Remove item"
                    className="text-fg-muted hover:text-fg cursor-pointer"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-border-strong">
                    <button
                      type="button"
                      onClick={() => updateQuantity(line.productId, line.size, line.color, line.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon className="h-3 w-3" />
                    </button>
                    <span className="w-7 text-center text-sm">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(line.productId, line.size, line.color, line.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-sm">{formatPrice(product.price * line.quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit border border-border p-6">
          <h2 className="mb-5 font-display text-xl">Order Summary</h2>
          <div className="flex justify-between text-sm">
            <span className="text-fg-muted">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-fg-muted">Shipping</span>
            <span>{formatPrice(15)}</span>
          </div>
          <div className="my-4 hr-fine" />
          <div className="flex justify-between text-base">
            <span>Total</span>
            <span>{formatPrice(subtotal + 15)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block bg-accent py-3.5 text-center text-sm tracking-wide text-on-accent transition-opacity hover:opacity-90"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
