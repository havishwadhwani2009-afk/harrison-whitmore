import productsData from "@/data/products.json";
import type { Product, Gender, Category, Subcategory } from "./types";

export const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
}

export type ProductFilters = {
  gender?: Gender;
  category?: Category;
  subcategory?: Subcategory;
  colors?: string[];
  sizes?: string[];
  materials?: string[];
  fits?: string[];
  seasons?: string[];
  collections?: string[];
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export function filterProducts(list: Product[], filters: ProductFilters): Product[] {
  return list.filter((p) => {
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.subcategory && p.subcategory !== filters.subcategory) return false;
    if (filters.colors?.length && !p.colors.some((c) => filters.colors!.includes(c.name))) return false;
    if (filters.sizes?.length && !p.sizes.some((s) => filters.sizes!.includes(s))) return false;
    if (filters.materials?.length && !filters.materials.includes(p.material)) return false;
    if (filters.fits?.length && !filters.fits.includes(p.fit)) return false;
    if (filters.seasons?.length && !filters.seasons.includes(p.season)) return false;
    if (filters.collections?.length && !filters.collections.includes(p.collection)) return false;
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    if (filters.isNew && !p.isNew) return false;
    if (filters.isBestSeller && !p.isBestSeller) return false;
    return true;
  });
}

export function sortProducts(list: Product[], sort?: string): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
    default:
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  }
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.gender === product.gender &&
        p.subcategory === product.subcategory
    )
    .slice(0, count);
}

export function getCompleteTheLook(product: Product): Product[] {
  return getProductsByIds(product.pairsWith);
}

export function formatPrice(price: number, currency: "GBP" = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export const NAV_STRUCTURE: {
  gender: Gender;
  categories: { category: Category; label: string; subcategories: { key: Subcategory; label: string }[] }[];
}[] = [
  {
    gender: "men",
    categories: [
      {
        category: "tops",
        label: "Tops",
        subcategories: [
          { key: "shirts", label: "Shirts" },
          { key: "polos", label: "Polos" },
          { key: "sweaters", label: "Sweaters" },
          { key: "cardigans", label: "Cardigans" },
        ],
      },
      {
        category: "bottoms",
        label: "Bottoms",
        subcategories: [
          { key: "trousers", label: "Trousers" },
          { key: "chinos", label: "Chinos" },
          { key: "jeans", label: "Jeans" },
        ],
      },
      {
        category: "accessories",
        label: "Accessories",
        subcategories: [
          { key: "watches", label: "Watches" },
          { key: "eyewear", label: "Eyewear" },
          { key: "belts", label: "Belts" },
        ],
      },
    ],
  },
  {
    gender: "women",
    categories: [
      {
        category: "tops",
        label: "Tops",
        subcategories: [
          { key: "shirts", label: "Shirts" },
          { key: "polos", label: "Polos" },
          { key: "sweaters", label: "Sweaters" },
          { key: "cardigans", label: "Cardigans" },
        ],
      },
      {
        category: "bottoms",
        label: "Bottoms",
        subcategories: [
          { key: "trousers", label: "Trousers" },
          { key: "chinos", label: "Chinos" },
          { key: "jeans", label: "Jeans" },
        ],
      },
      {
        category: "accessories",
        label: "Accessories",
        subcategories: [
          { key: "watches", label: "Watches" },
          { key: "eyewear", label: "Eyewear" },
          { key: "belts", label: "Belts" },
        ],
      },
    ],
  },
];

export const CATEGORY_LABELS: Record<Subcategory, string> = {
  shirts: "Shirts",
  polos: "Polos",
  sweaters: "Sweaters",
  cardigans: "Cardigans",
  trousers: "Trousers",
  chinos: "Chinos",
  jeans: "Jeans",
  watches: "Watches",
  eyewear: "Eyewear",
  belts: "Belts",
};
