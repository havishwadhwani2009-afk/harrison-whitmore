"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminGate } from "@/components/admin-gate";
import { AdminProductForm } from "@/components/admin-product-form";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [genderFilter, setGenderFilter] = useState<"all" | "men" | "women">("all");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    setProducts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    // Client-side fetch on mount for this internal admin panel.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    load();
  }

  const visible = products.filter((p) => genderFilter === "all" || p.gender === genderFilter);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-fg-muted">Admin</p>
          <h1 className="font-display text-3xl">Product Management</h1>
        </div>
        {!adding && !editing && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="bg-accent px-5 py-2.5 text-sm text-on-accent hover:opacity-90 cursor-pointer"
          >
            + Add Product
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-10">
          <AdminProductForm
            onCancel={() => setAdding(false)}
            onSaved={() => {
              setAdding(false);
              load();
            }}
          />
        </div>
      )}

      {editing && (
        <div className="mb-10">
          <AdminProductForm
            product={editing}
            onCancel={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              load();
            }}
          />
        </div>
      )}

      {!adding && !editing && (
        <>
          <div className="mb-4 flex gap-2 text-sm">
            {(["all", "men", "women"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGenderFilter(g)}
                className={`border px-3 py-1.5 capitalize cursor-pointer ${
                  genderFilter === g ? "border-fg" : "border-border-strong text-fg-muted"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-fg-muted">Loading products…</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-fg-muted">
                    <th className="py-2 pr-4 font-normal">Name</th>
                    <th className="py-2 pr-4 font-normal">Gender</th>
                    <th className="py-2 pr-4 font-normal">Category</th>
                    <th className="py-2 pr-4 font-normal">Price</th>
                    <th className="py-2 pr-4 font-normal">Stock</th>
                    <th className="py-2 pr-4 font-normal"></th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((p) => (
                    <tr key={p.id} className="border-b border-border">
                      <td className="py-3 pr-4">{p.name}</td>
                      <td className="py-3 pr-4 capitalize">{p.gender}</td>
                      <td className="py-3 pr-4 capitalize">
                        {p.category} / {p.subcategory}
                      </td>
                      <td className="py-3 pr-4">{formatPrice(p.price)}</td>
                      <td className="py-3 pr-4">{p.stock}</td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setEditing(p)}
                            className="underline-offset-4 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id)}
                            className="text-fg-muted underline-offset-4 hover:text-fg hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminDashboard />
    </AdminGate>
  );
}
