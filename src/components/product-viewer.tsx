"use client";

import { useState } from "react";
import { ProductGallery } from "./product-gallery";
import { ProductPurchasePanel } from "./product-purchase-panel";
import { StarRating } from "./star-rating";
import { colorNameToTone } from "./garment-art";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

/** Owns the selected colour so the gallery image and the swatch selector stay in sync —
 * rendered as two flat children (not wrapped) so the parent's CSS grid still applies to each. */
export function ProductViewer({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const tone = colorNameToTone(color, product.tone);

  return (
    <>
      <ProductGallery subcategory={product.subcategory} tone={tone} productName={`${product.name} — ${color}`} />
      <div>
        <p className="text-sm tracking-wide text-fg-muted">{product.collection}</p>
        <h1 className="mt-1 font-display text-3xl md:text-4xl">{product.name}</h1>
        <p className="mt-3 text-xl">{formatPrice(product.price)}</p>
        <div className="mt-3">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="my-7 hr-fine" />
        <ProductPurchasePanel product={product} color={color} onColorChange={setColor} />
      </div>
    </>
  );
}
