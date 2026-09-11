import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts, getCompleteTheLook, CATEGORY_LABELS } from "@/lib/products";
import { ProductViewer } from "@/components/product-viewer";
import { AccordionItem } from "@/components/accordion";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { RecentlyViewed } from "@/components/recently-viewed";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const completeTheLook = getCompleteTheLook(product);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
      <nav className="mb-8 text-sm text-fg-muted">
        <Link href={`/${product.gender}`} className="capitalize hover:text-fg">
          {product.gender}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${product.gender}/${product.category}/${product.subcategory}`} className="hover:text-fg">
          {CATEGORY_LABELS[product.subcategory]}
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <ProductViewer product={product} />
        <div className="md:col-start-2">
          <div className="mt-10">
            <AccordionItem title="Description" defaultOpen>
              <p>{product.feel}</p>
            </AccordionItem>
            <AccordionItem title="Care Instructions">
              <ul className="list-disc space-y-1 pl-4">
                {product.careInstructions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem title="Shipping & Returns">
              <p>
                Complimentary worldwide shipping, with delivery estimates shown at checkout. Items
                may be returned within 30 days of delivery in their original condition. See our{" "}
                <Link href="/shipping-returns" className="underline underline-offset-4">
                  Shipping &amp; Returns
                </Link>{" "}
                page for full details.
              </p>
            </AccordionItem>
          </div>
        </div>
      </div>

      {completeTheLook.length > 0 && (
        <section className="mt-24 border-t border-border pt-16">
          <ScrollReveal>
            <p className="text-sm tracking-[0.15em] text-fg-muted">STYLING NOTES</p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl">Complete the Look</h2>
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {completeTheLook.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20 border-t border-border pt-16">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl">You May Also Like</h2>
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {related.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed currentProductId={product.id} />
    </div>
  );
}
