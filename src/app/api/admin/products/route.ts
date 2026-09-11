import { NextRequest, NextResponse } from "next/server";
import { readProducts, writeProducts, nextId, buildSlug } from "@/lib/admin-store";
import type { Product } from "@/lib/types";

export async function GET() {
  const products = await readProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const products = await readProducts();

  const id = nextId(products);
  const product: Product = {
    id,
    slug: buildSlug(body.gender, body.name),
    name: body.name,
    gender: body.gender,
    category: body.category,
    subcategory: body.subcategory,
    collection: body.collection || "House Collection",
    price: Number(body.price) || 0,
    currency: "GBP",
    colors: body.colors ?? [{ name: "Cream", hex: "#efe7d6" }],
    sizes: body.sizes ?? ["S", "M", "L"],
    feel: body.feel || "",
    careInstructions: body.careInstructions ?? [],
    material: body.material || "",
    fit: body.fit || "regular",
    season: body.season || "all-season",
    rating: 4.5,
    reviewCount: 0,
    isNew: Boolean(body.isNew),
    isBestSeller: Boolean(body.isBestSeller),
    stock: Number(body.stock) || 0,
    pairsWith: body.pairsWith ?? [],
    tone: body.tone || "navy",
  };

  await writeProducts([...products, product]);
  return NextResponse.json(product, { status: 201 });
}
