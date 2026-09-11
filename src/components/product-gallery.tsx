"use client";

import { useState } from "react";
import { GarmentArt } from "./garment-art";
import { CloseIcon } from "./icons";
import type { Subcategory } from "@/lib/types";
import type { Tone } from "./garment-art";

type GalleryImage = { variant: "flat" | "texture"; mirrored?: boolean; label: string };

export function ProductGallery({
  subcategory,
  tone,
  productName,
}: {
  subcategory: Subcategory;
  tone: Tone;
  productName: string;
}) {
  const images: GalleryImage[] = [
    { variant: "flat", label: `${productName} — front` },
    { variant: "flat", mirrored: true, label: `${productName} — reverse` },
    { variant: "texture", label: `${productName} — fabric detail` },
  ];
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <div className="flex gap-3 md:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${img.label}`}
            className={`h-16 w-14 shrink-0 overflow-hidden rounded-sm border transition-colors md:h-20 md:w-16 cursor-pointer ${
              active === i ? "border-fg" : "border-border-strong opacity-70 hover:opacity-100"
            }`}
          >
            <GarmentArt
              subcategory={subcategory}
              tone={tone}
              variant={img.variant}
              className="h-full w-full"
              label={img.label}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setZoomed(true)}
        aria-label="Click to zoom"
        className="relative flex-1 aspect-[4/5] overflow-hidden rounded-md bg-bg-sunken cursor-zoom-in"
      >
        <GarmentArt
          subcategory={subcategory}
          tone={tone}
          variant={images[active].variant}
          className={`h-full w-full ${images[active].mirrored ? "-scale-x-100" : ""}`}
          label={images[active].label}
        />
      </button>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Close zoom"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <div className="aspect-[4/5] w-full max-w-xl overflow-hidden rounded-md">
            <GarmentArt
              subcategory={subcategory}
              tone={tone}
              variant={images[active].variant}
              className={`h-full w-full ${images[active].mirrored ? "-scale-x-100" : ""}`}
              label={images[active].label}
            />
          </div>
        </div>
      )}
    </div>
  );
}
