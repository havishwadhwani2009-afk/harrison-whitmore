"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./product-card";
import { Dropdown } from "./dropdown";
import type { Product, Fit, Season } from "@/lib/types";

const PRICE_TIERS: { label: string; min?: number; max?: number }[] = [
  { label: "Under £150", max: 149 },
  { label: "£150 – £300", min: 150, max: 300 },
  { label: "£300 and above", min: 301 },
];

const SEASON_LABELS: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
  "all-season": "All Season",
};

const FIT_LABELS: Record<Fit, string> = {
  slim: "Slim",
  regular: "Regular",
  relaxed: "Relaxed",
  tailored: "Tailored",
};

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function CheckOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-current" />
      {label}
    </label>
  );
}

export function CatalogueClient({
  products,
  title,
  description,
}: {
  products: Product[];
  title: string;
  description?: string;
}) {
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [fits, setFits] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [priceTier, setPriceTier] = useState<string | null>(null);
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest");

  const options = useMemo(
    () => ({
      colors: unique(products.flatMap((p) => p.colors.map((c) => c.name))),
      sizes: unique(products.flatMap((p) => p.sizes)),
      materials: unique(products.map((p) => p.material)),
      fits: unique(products.map((p) => p.fit)),
      seasons: unique(products.map((p) => p.season)),
      collections: unique(products.map((p) => p.collection)),
    }),
    [products]
  );

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const tier = PRICE_TIERS.find((t) => t.label === priceTier);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (materials.length && !materials.includes(p.material)) return false;
      if (fits.length && !fits.includes(p.fit)) return false;
      if (seasons.length && !seasons.includes(p.season)) return false;
      if (collections.length && !collections.includes(p.collection)) return false;
      if (tier?.min !== undefined && p.price < tier.min) return false;
      if (tier?.max !== undefined && p.price > tier.max) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return Number(b.isNew) - Number(a.isNew);
    });
    return list;
  }, [products, colors, sizes, materials, fits, seasons, collections, tier, sort]);

  const activeCount =
    colors.length + sizes.length + materials.length + fits.length + seasons.length + collections.length + (priceTier ? 1 : 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
      <div className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-xl text-fg-muted">{description}</p>}
      </div>

      <div className="mb-8 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          <Dropdown label="Size" active={sizes.length > 0}>
            {options.sizes.map((s) => (
              <CheckOption key={s} label={s} checked={sizes.includes(s)} onChange={() => toggle(sizes, setSizes, s)} />
            ))}
          </Dropdown>
          <Dropdown label="Color" active={colors.length > 0}>
            {options.colors.map((c) => (
              <CheckOption key={c} label={c} checked={colors.includes(c)} onChange={() => toggle(colors, setColors, c)} />
            ))}
          </Dropdown>
          <Dropdown label="Price" active={!!priceTier}>
            {PRICE_TIERS.map((t) => (
              <CheckOption
                key={t.label}
                label={t.label}
                checked={priceTier === t.label}
                onChange={() => setPriceTier(priceTier === t.label ? null : t.label)}
              />
            ))}
          </Dropdown>
          <Dropdown label="Material" active={materials.length > 0}>
            {options.materials.map((m) => (
              <CheckOption key={m} label={m} checked={materials.includes(m)} onChange={() => toggle(materials, setMaterials, m)} />
            ))}
          </Dropdown>
          <Dropdown label="Fit" active={fits.length > 0}>
            {options.fits.map((f) => (
              <CheckOption
                key={f}
                label={FIT_LABELS[f as Fit]}
                checked={fits.includes(f)}
                onChange={() => toggle(fits, setFits, f)}
              />
            ))}
          </Dropdown>
          <Dropdown label="Season" active={seasons.length > 0}>
            {options.seasons.map((s) => (
              <CheckOption
                key={s}
                label={SEASON_LABELS[s as Season]}
                checked={seasons.includes(s)}
                onChange={() => toggle(seasons, setSeasons, s)}
              />
            ))}
          </Dropdown>
          <Dropdown label="Collection" active={collections.length > 0}>
            {options.collections.map((c) => (
              <CheckOption
                key={c}
                label={c}
                checked={collections.includes(c)}
                onChange={() => toggle(collections, setCollections, c)}
              />
            ))}
          </Dropdown>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setColors([]);
                setSizes([]);
                setMaterials([]);
                setFits([]);
                setSeasons([]);
                setCollections([]);
                setPriceTier(null);
              }}
              className="shrink-0 whitespace-nowrap px-3 py-2 text-sm text-fg-muted underline-offset-4 hover:underline cursor-pointer"
            >
              Clear ({activeCount})
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="w-fit shrink-0 border border-border-strong bg-bg px-4 py-2 text-sm cursor-pointer"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <p className="mb-6 text-sm text-fg-muted">
        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-fg-muted">
          No pieces match your selection. Try clearing a filter.
        </p>
      )}
    </div>
  );
}
