"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/context/recently-viewed-context";
import { getProductsByIds } from "@/lib/products";
import { ProductCard } from "./product-card";
import { ScrollReveal } from "./scroll-reveal";

/** Records the current product as viewed, then renders the other recently
 * viewed pieces (if any) as a styling-notes-style row beneath the fold. */
export function RecentlyViewed({ currentProductId }: { currentProductId: string }) {
  const { ids, recordView } = useRecentlyViewed();

  useEffect(() => {
    recordView(currentProductId);
    // Only record once per product page visit, not on every ids change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProductId]);

  const otherIds = ids.filter((id) => id !== currentProductId);
  const products = getProductsByIds(otherIds).slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="mt-20 border-t border-border pt-16">
      <ScrollReveal>
        <h2 className="font-display text-2xl md:text-3xl">Recently Viewed</h2>
      </ScrollReveal>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {products.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 70}>
            <ProductCard product={p} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
