import { getAllProducts } from "@/lib/products";
import { CatalogueClient } from "@/components/catalogue-client";

export const metadata = { title: "New Arrivals — Harrison Whitmore" };

export default function NewArrivalsPage() {
  const products = getAllProducts().filter((p) => p.isNew || p.isBestSeller);

  return (
    <CatalogueClient
      products={products}
      title="New Arrivals"
      description="The most recent additions to the house, alongside the pieces our clients return to season after season."
    />
  );
}
