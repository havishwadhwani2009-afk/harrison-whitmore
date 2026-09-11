"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";
import { getProductsByIds } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
  const { ids, isReady } = useWishlist();
  const products = getProductsByIds(ids);

  if (isReady && products.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl">Your wishlist is empty</h1>
        <p className="mt-3 text-fg-muted">Save pieces you love by tapping the heart icon.</p>
        <Link href="/men" className="mt-8 inline-block border border-fg px-7 py-3 text-sm tracking-wide hover:bg-overlay">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
      <h1 className="mb-10 font-display text-4xl">Wishlist</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
