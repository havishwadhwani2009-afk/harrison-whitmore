import { notFound } from "next/navigation";
import { getAllProducts, CATEGORY_LABELS } from "@/lib/products";
import { CatalogueClient } from "@/components/catalogue-client";
import type { Category, Gender, Subcategory } from "@/lib/types";

const GENDERS: Gender[] = ["men", "women"];
const CATEGORIES: Category[] = ["tops", "bottoms", "accessories"];
const SUBCATEGORY_BY_CATEGORY: Record<Category, Subcategory[]> = {
  tops: ["shirts", "polos", "sweaters", "cardigans"],
  bottoms: ["trousers", "chinos", "jeans"],
  accessories: ["watches", "eyewear", "belts"],
};

export default async function GenderCataloguePage({
  params,
}: {
  params: Promise<{ gender: string; slug?: string[] }>;
}) {
  const { gender, slug = [] } = await params;

  if (!GENDERS.includes(gender as Gender)) notFound();
  const genderTyped = gender as Gender;

  const [categorySlug, subcategorySlug] = slug;
  let category: Category | undefined;
  let subcategory: Subcategory | undefined;

  if (categorySlug) {
    if (!CATEGORIES.includes(categorySlug as Category)) notFound();
    category = categorySlug as Category;
  }
  if (subcategorySlug) {
    if (!category || !SUBCATEGORY_BY_CATEGORY[category].includes(subcategorySlug as Subcategory)) notFound();
    subcategory = subcategorySlug as Subcategory;
  }

  const products = getAllProducts().filter((p) => {
    if (p.gender !== genderTyped) return false;
    if (category && p.category !== category) return false;
    if (subcategory && p.subcategory !== subcategory) return false;
    return true;
  });

  const genderLabel = genderTyped === "men" ? "Men's" : "Women's";
  const title = subcategory
    ? `${genderLabel} ${CATEGORY_LABELS[subcategory]}`
    : category
      ? `${genderLabel} ${category.charAt(0).toUpperCase()}${category.slice(1)}`
      : `${genderLabel} Collection`;

  return (
    <CatalogueClient
      products={products}
      title={title}
      description="Considered pieces, cut from honest cloth for a life well kept."
    />
  );
}
