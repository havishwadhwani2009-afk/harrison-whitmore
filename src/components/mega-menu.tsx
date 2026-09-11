import Link from "next/link";
import { NAV_STRUCTURE } from "@/lib/products";
import { GarmentArt } from "./garment-art";
import type { Gender } from "@/lib/types";

export function MegaMenu({ gender, onNavigate }: { gender: Gender; onNavigate?: () => void }) {
  const nav = NAV_STRUCTURE.find((n) => n.gender === gender);
  if (!nav) return null;

  const teaserTone = gender === "men" ? "navy" : "burgundy";
  const teaserSubcategory = gender === "men" ? "sweaters" : "cardigans";

  return (
    <div className="absolute left-0 right-0 top-full z-40 hidden border-t border-border bg-bg-elevated shadow-lift group-hover:block">
      <div className="mx-auto grid max-w-6xl grid-cols-4 gap-10 px-8 py-10">
        {nav.categories.map((cat) => (
          <div key={cat.category}>
            <Link
              href={`/${gender}/${cat.category}`}
              onClick={onNavigate}
              className="mb-3 block text-[13px] tracking-wide text-fg-muted transition-colors hover:text-fg"
            >
              {cat.label}
            </Link>
            <ul className="space-y-2.5">
              {cat.subcategories.map((sub) => (
                <li key={sub.key}>
                  <Link
                    href={`/${gender}/${cat.category}/${sub.key}`}
                    onClick={onNavigate}
                    className="font-display text-lg text-fg transition-colors hover:text-fg-muted"
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link
          href={`/${gender}`}
          onClick={onNavigate}
          className="group/teaser relative block overflow-hidden rounded-md"
        >
          <GarmentArt
            subcategory={teaserSubcategory}
            tone={teaserTone}
            className="h-full w-full transition-transform duration-700 group-hover/teaser:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-5">
            <span className="font-display text-2xl text-white">
              Shop All {gender === "men" ? "Men's" : "Women's"}
            </span>
            <span className="mt-1 text-sm text-white/80">The full collection &rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
