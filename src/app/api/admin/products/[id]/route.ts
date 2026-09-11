import { NextRequest, NextResponse } from "next/server";
import { readProducts, writeProducts } from "@/lib/admin-store";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  products[index] = {
    ...products[index],
    ...body,
    price: body.price !== undefined ? Number(body.price) : products[index].price,
    stock: body.stock !== undefined ? Number(body.stock) : products[index].stock,
  };
  await writeProducts(products);
  return NextResponse.json(products[index]);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await readProducts();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writeProducts(next);
  return NextResponse.json({ ok: true });
}
