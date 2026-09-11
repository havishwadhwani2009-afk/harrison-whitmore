"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { HeartIcon, MinusIcon, PlusIcon } from "./icons";
import type { Product } from "@/lib/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addLine } = useCart();
  const { has, toggle } = useWishlist();
  const router = useRouter();
  const saved = has(product.id);

  function handleAddToCart() {
    if (!size) return;
    addLine({ productId: product.id, size, color }, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  }

  function handleBuyNow() {
    if (!size) return;
    addLine({ productId: product.id, size, color }, quantity);
    router.push("/checkout");
  }

  return (
    <div>
      <div className="mb-5">
        <p className="mb-2 text-sm">
          Colour — <span className="text-fg-muted">{color}</span>
        </p>
        <div className="flex gap-2">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c.name)}
              aria-label={c.name}
              className={`h-8 w-8 rounded-full border-2 transition-transform cursor-pointer ${
                color === c.name ? "border-fg scale-110" : "border-transparent"
              }`}
            >
              <span className="block h-full w-full rounded-full border border-border-strong" style={{ backgroundColor: c.hex }} />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm" htmlFor="size-select">
          Size
        </label>
        <select
          id="size-select"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full border border-border-strong bg-bg px-4 py-3 text-sm cursor-pointer"
        >
          <option value="">Select a size</option>
          {product.sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-sm">Quantity</p>
        <div className="flex w-fit items-center border border-border-strong">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex h-10 w-10 items-center justify-center cursor-pointer"
          >
            <MinusIcon className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="flex h-10 w-10 items-center justify-center cursor-pointer"
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {!size && (
        <p className="mb-3 text-xs text-fg-muted">Please select a size to continue.</p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!size}
          className="flex-1 bg-accent py-3.5 text-sm tracking-wide text-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          {justAdded ? "Added to Bag" : "Add to Bag"}
        </button>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-border-strong cursor-pointer"
        >
          <HeartIcon className="h-[18px] w-[18px]" filled={saved} />
        </button>
      </div>
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={!size}
        className="mt-3 w-full border border-fg py-3.5 text-sm tracking-wide transition-colors hover:bg-overlay disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
      >
        Buy Now
      </button>
    </div>
  );
}
