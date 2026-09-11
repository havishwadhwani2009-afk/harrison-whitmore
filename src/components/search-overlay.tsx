"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAllProducts, formatPrice } from "@/lib/products";
import { GarmentArt } from "./garment-art";
import { CloseIcon, SearchIcon } from "./icons";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const products = useMemo(() => getAllProducts(), []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Reset the search field once the close transition starts.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
    }
  }, [open]);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, products]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-bg">
      <div className="mx-auto flex max-w-3xl flex-col px-6 pt-24">
        <div className="flex items-center gap-4 border-b border-border-strong pb-4">
          <SearchIcon className="h-5 w-5 text-fg-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for shirts, polos, watches…"
            className="flex-1 bg-transparent font-display text-2xl outline-none placeholder:text-fg-muted"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-9 w-9 items-center justify-center cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8">
          {results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-overlay"
                  >
                    <GarmentArt
                      subcategory={p.subcategory}
                      tone={p.tone}
                      className="h-14 w-14 rounded-sm"
                    />
                    <span className="flex-1">
                      <span className="block font-display text-lg">{p.name}</span>
                      <span className="block text-sm text-fg-muted capitalize">
                        {p.gender} · {p.collection}
                      </span>
                    </span>
                    <span className="text-sm">{formatPrice(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.trim().length >= 2 ? (
            <p className="text-fg-muted">No pieces found for &ldquo;{query}&rdquo;.</p>
          ) : (
            <p className="text-fg-muted">Try &ldquo;cashmere&rdquo;, &ldquo;polo&rdquo;, or &ldquo;chino&rdquo;.</p>
          )}
        </div>
      </div>
    </div>
  );
}
