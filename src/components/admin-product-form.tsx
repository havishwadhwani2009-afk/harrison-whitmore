"use client";

import { useState, FormEvent } from "react";
import type { Product } from "@/lib/types";

const TONES = ["cream", "navy", "olive", "burgundy", "stone", "charcoal"];
const FITS = ["slim", "regular", "relaxed", "tailored"];
const SEASONS = ["spring", "summer", "autumn", "winter", "all-season"];
const CATEGORY_SUBCATEGORIES: Record<string, string[]> = {
  tops: ["shirts", "polos", "sweaters", "cardigans"],
  bottoms: ["trousers", "chinos", "jeans"],
  accessories: ["watches", "eyewear", "belts"],
};

export type ProductFormValues = {
  name: string;
  gender: "men" | "women";
  category: "tops" | "bottoms" | "accessories";
  subcategory: string;
  collection: string;
  price: number;
  stock: number;
  material: string;
  fit: string;
  season: string;
  tone: string;
  feel: string;
  sizesText: string;
  colorsText: string;
  isNew: boolean;
  isBestSeller: boolean;
};

function productToFormValues(p?: Product): ProductFormValues {
  return {
    name: p?.name ?? "",
    gender: p?.gender ?? "men",
    category: p?.category ?? "tops",
    subcategory: p?.subcategory ?? "shirts",
    collection: p?.collection ?? "House Collection",
    price: p?.price ?? 100,
    stock: p?.stock ?? 20,
    material: p?.material ?? "",
    fit: p?.fit ?? "regular",
    season: p?.season ?? "all-season",
    tone: p?.tone ?? "navy",
    feel: p?.feel ?? "",
    sizesText: p?.sizes.join(", ") ?? "S, M, L",
    colorsText: p?.colors.map((c) => `${c.name}:${c.hex}`).join(", ") ?? "Navy:#1f3153",
    isNew: p?.isNew ?? false,
    isBestSeller: p?.isBestSeller ?? false,
  };
}

export function AdminProductForm({
  product,
  onCancel,
  onSaved,
}: {
  product?: Product;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<ProductFormValues>(productToFormValues(product));
  const [saving, setSaving] = useState(false);

  function set<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: values.name,
      gender: values.gender,
      category: values.category,
      subcategory: values.subcategory,
      collection: values.collection,
      price: values.price,
      stock: values.stock,
      material: values.material,
      fit: values.fit,
      season: values.season,
      tone: values.tone,
      feel: values.feel,
      isNew: values.isNew,
      isBestSeller: values.isBestSeller,
      sizes: values.sizesText.split(",").map((s) => s.trim()).filter(Boolean),
      colors: values.colorsText
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .map((c) => {
          const [name, hex] = c.split(":").map((s) => s.trim());
          return { name, hex: hex || "#1f3153" };
        }),
    };

    const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
    const method = product ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border p-6">
      <h2 className="mb-5 font-display text-xl">{product ? "Edit Product" : "Add Product"}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-xs text-fg-muted sm:col-span-2">
          Name
          <input
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="text-xs text-fg-muted">
          Gender
          <select
            value={values.gender}
            onChange={(e) => set("gender", e.target.value as ProductFormValues["gender"])}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </label>

        <label className="text-xs text-fg-muted">
          Category
          <select
            value={values.category}
            onChange={(e) => {
              const category = e.target.value as ProductFormValues["category"];
              set("category", category);
              set("subcategory", CATEGORY_SUBCATEGORIES[category][0]);
            }}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          >
            {Object.keys(CATEGORY_SUBCATEGORIES).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-fg-muted">
          Subcategory
          <select
            value={values.subcategory}
            onChange={(e) => set("subcategory", e.target.value)}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          >
            {CATEGORY_SUBCATEGORIES[values.category].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-fg-muted">
          Collection
          <input
            value={values.collection}
            onChange={(e) => set("collection", e.target.value)}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="text-xs text-fg-muted">
          Price (£)
          <input
            required
            type="number"
            min={0}
            value={values.price}
            onChange={(e) => set("price", Number(e.target.value))}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="text-xs text-fg-muted">
          Stock
          <input
            required
            type="number"
            min={0}
            value={values.stock}
            onChange={(e) => set("stock", Number(e.target.value))}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="text-xs text-fg-muted">
          Swatch Tone
          <select
            value={values.tone}
            onChange={(e) => set("tone", e.target.value)}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          >
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-fg-muted">
          Material
          <input
            value={values.material}
            onChange={(e) => set("material", e.target.value)}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="text-xs text-fg-muted">
          Fit
          <select
            value={values.fit}
            onChange={(e) => set("fit", e.target.value)}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          >
            {FITS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-fg-muted">
          Season
          <select
            value={values.season}
            onChange={(e) => set("season", e.target.value)}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          >
            {SEASONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-fg-muted sm:col-span-2">
          Sizes (comma separated)
          <input
            value={values.sizesText}
            onChange={(e) => set("sizesText", e.target.value)}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="text-xs text-fg-muted sm:col-span-2">
          Colors (name:hex, comma separated)
          <input
            value={values.colorsText}
            onChange={(e) => set("colorsText", e.target.value)}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="text-xs text-fg-muted sm:col-span-2">
          Feel / Description
          <textarea
            value={values.feel}
            onChange={(e) => set("feel", e.target.value)}
            rows={3}
            className="mt-1 w-full border border-border-strong bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-xs text-fg-muted">
          <input type="checkbox" checked={values.isNew} onChange={(e) => set("isNew", e.target.checked)} />
          Mark as New
        </label>
        <label className="flex items-center gap-2 text-xs text-fg-muted">
          <input
            type="checkbox"
            checked={values.isBestSeller}
            onChange={(e) => set("isBestSeller", e.target.checked)}
          />
          Mark as Best Seller
        </label>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-accent px-6 py-2.5 text-sm text-on-accent hover:opacity-90 disabled:opacity-60 cursor-pointer"
        >
          {saving ? "Saving…" : "Save Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-border-strong px-6 py-2.5 text-sm text-fg-muted hover:text-fg cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
