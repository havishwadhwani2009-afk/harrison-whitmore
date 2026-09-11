import { getAllProducts } from "@/lib/products";
import { CatalogueClient } from "@/components/catalogue-client";

export const metadata = { title: "Fall/Winter 2026–27 — Harrison Whitmore" };

export default function NewArrivalsPage() {
  const products = getAllProducts().filter((p) => p.isNew || p.isBestSeller);

  return (
    <CatalogueClient
      products={products}
      title="Fall/Winter 2026–27"
      description="The most recent additions to the house, alongside the pieces our clients return to season after season."
    />
  );
}
