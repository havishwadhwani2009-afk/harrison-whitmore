import { promises as fs } from "fs";
import path from "path";
import type { Product } from "./types";

const DATA_PATH = path.join(process.cwd(), "src", "data", "products.json");

export async function readProducts(): Promise<Product[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Product[];
}

export async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2), "utf-8");
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function nextId(products: Product[]): string {
  const max = products.reduce((m, p) => {
    const n = Number(p.id.replace(/\D/g, ""));
    return Number.isFinite(n) ? Math.max(m, n) : m;
  }, 0);
  return `p${String(max + 1).padStart(3, "0")}`;
}

export function buildSlug(gender: string, name: string) {
  return slugify(`${gender}-${name}`);
}
