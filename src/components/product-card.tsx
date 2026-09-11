"use client";

import Link from "next/link";
import { GarmentArt } from "./garment-art";
import { HeartIcon } from "./icons";
import { formatPrice } from "@/lib/products";
import { useWishlist } from "@/context/wishlist-context";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const saved = has(product.id);

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-bg-sunken">
        <Link href={`/product/${product.slug}`}>
          <GarmentArt
            subcategory={product.subcategory}
            tone={product.tone}
            variant="flat"
            className="absolute inset-0 h-full w-full transition-opacity duration-700 group-hover:opacity-0"
            label={product.name}
          />
          <GarmentArt
            subcategory={product.subcategory}
            tone={product.tone}
            variant="texture"
            className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            label={`${product.name} fabric detail`}
          />
        </Link>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-bg/80 backdrop-blur-sm transition-transform hover:scale-105 cursor-pointer"
        >
          <HeartIcon className="h-4 w-4" filled={saved} />
        </button>
        {product.isNew && (
          <span className="absolute left-3 top-3 font-display text-xs tracking-wider text-fg/70">
            New
          </span>
        )}
      </div>

      <Link href={`/product/${product.slug}`} className="mt-3 block">
        <h3 className="font-display text-lg leading-tight">{product.name}</h3>
        <p className="mt-0.5 text-sm text-fg-muted">{formatPrice(product.price)}</p>
        <div className="mt-2 flex gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3 w-3 rounded-full border border-border-strong"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </Link>
    </div>
  );
}
