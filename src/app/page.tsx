import Link from "next/link";
import { SceneArt } from "@/components/scene-art";
import { GarmentArt } from "@/components/garment-art";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { NewsletterForm } from "@/components/newsletter-form";
import { getAllProducts, getProductById, formatPrice } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();
  const featured = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 8);

  const lookProductIds = ["p007", "p012", "p018", "p020"]; // merino crewneck, chelsea trouser, watch, sunglasses
  const look = lookProductIds.map((id) => getProductById(id)).filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[88vh] min-h-[560px] items-end overflow-hidden">
        <SceneArt
          variant="estate"
          tone="navy"
          animate
          className="absolute inset-0 h-full w-full"
          label="An estate in the European countryside"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-white md:px-10 md:pb-24">
          <p className="mb-3 text-sm tracking-[0.2em] text-white/80">EST. HARRISON WHITMORE</p>
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] md:text-7xl">
            Quiet tailoring, for a life well kept.
          </h1>
          <p className="mt-5 max-w-md text-base text-white/85 md:text-lg">
            Considered pieces for men and women, cut from honest cloth and drawn from the coastlines
            and townhouses of old Europe.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/men"
              className="border border-white px-7 py-3 text-sm tracking-wide text-white transition-colors hover:bg-white hover:text-accent"
            >
              Shop Men
            </Link>
            <Link
              href="/women"
              className="border border-white px-7 py-3 text-sm tracking-wide text-white transition-colors hover:bg-white hover:text-accent"
            >
              Shop Women
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ScrollReveal>
            <Link href="/men" className="group relative block aspect-[4/5] overflow-hidden rounded-md">
              <SceneArt
                variant="townhouse"
                tone="charcoal"
                className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] group-hover:scale-105"
                label="Menswear at a London townhouse"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h2 className="font-display text-3xl text-white md:text-4xl">Menswear</h2>
                <span className="mt-2 inline-block text-sm text-white/85 underline-offset-4 group-hover:underline">
                  Shop the collection
                </span>
              </div>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <Link href="/women" className="group relative block aspect-[4/5] overflow-hidden rounded-md">
              <SceneArt
                variant="coast"
                tone="burgundy"
                className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] group-hover:scale-105"
                label="Womenswear along the Riviera coast"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h2 className="font-display text-3xl text-white md:text-4xl">Womenswear</h2>
                <span className="mt-2 inline-block text-sm text-white/85 underline-offset-4 group-hover:underline">
                  Shop the collection
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6 py-4 md:px-10">
        <ScrollReveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm tracking-[0.15em] text-fg-muted">CURATED</p>
              <h2 className="mt-1 font-display text-3xl md:text-4xl">New Arrivals &amp; Favourites</h2>
            </div>
            <Link href="/new-arrivals" className="hidden text-sm underline-offset-4 hover:underline md:block">
              View all
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {featured.map((p, i) => (
            <ScrollReveal key={p.id} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
        <Link href="/new-arrivals" className="mt-10 block text-center text-sm underline-offset-4 hover:underline md:hidden">
          View all
        </Link>
      </section>

      {/* Lookbook / styling */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <ScrollReveal>
          <p className="text-sm tracking-[0.15em] text-fg-muted">STYLING NOTES</p>
          <h2 className="mt-1 max-w-xl font-display text-3xl md:text-4xl">
            The Weekend at Chatsworth
          </h2>
          <p className="mt-4 max-w-lg text-fg-muted">
            A merino crewneck layered over a poplin shirt, pleated flannel trousers, and a dress
            watch — the kind of quiet assembly that moves easily from a country lunch to an evening
            by the fire.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-[1.3fr_1fr]">
          <ScrollReveal delay={100} className="relative aspect-[16/11] overflow-hidden rounded-md">
            <SceneArt variant="estate" tone="stone" className="absolute inset-0 h-full w-full" label="A country weekend" />
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4">
            {look.map((item, i) =>
              item ? (
                <ScrollReveal key={item.id} delay={150 + i * 80}>
                  <Link href={`/product/${item.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-md bg-bg-sunken">
                      <GarmentArt
                        subcategory={item.subcategory}
                        tone={item.tone}
                        className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 text-sm">{item.name}</p>
                    <p className="text-sm text-fg-muted">{formatPrice(item.price)}</p>
                  </Link>
                </ScrollReveal>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* Brand philosophy teaser */}
      <section className="border-t border-border bg-bg-sunken">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:px-10 md:py-28">
          <ScrollReveal className="relative aspect-[4/5] overflow-hidden rounded-md md:order-2">
            <SceneArt variant="harbor" tone="olive" className="absolute inset-0 h-full w-full" label="A quiet harbour" />
          </ScrollReveal>
          <ScrollReveal delay={100} className="md:order-1">
            <p className="text-sm tracking-[0.15em] text-fg-muted">OUR PHILOSOPHY</p>
            <h2 className="mt-2 max-w-md font-display text-3xl md:text-4xl">
              Made to be worn, not merely owned.
            </h2>
            <p className="mt-5 max-w-md text-fg-muted">
              We favour honest cloth, unhurried construction, and a restrained hand — clothing
              intended to be lived in for decades, not seasons.
            </p>
            <Link href="/about" className="mt-6 inline-block text-sm underline-offset-4 hover:underline">
              Read our story &rarr;
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Social gallery */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-28">
        <ScrollReveal className="mb-10">
          <p className="text-sm tracking-[0.15em] text-fg-muted">@HARRISONWHITMORE</p>
          <h2 className="mt-1 font-display text-3xl md:text-4xl">From the House</h2>
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {(["countryside", "townhouse", "coast", "estate", "harbor", "countryside"] as const).map(
            (variant, i) => (
              <ScrollReveal key={i} delay={i * 60} className="aspect-square overflow-hidden rounded-sm">
                <SceneArt
                  variant={variant}
                  tone={(["cream", "navy", "olive", "burgundy", "stone", "charcoal"] as const)[i]}
                  className="h-full w-full"
                />
              </ScrollReveal>
            )
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-accent text-on-accent">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:px-10">
          <p className="text-sm tracking-[0.15em] opacity-80">JOIN THE CIRCLE</p>
          <h2 className="mx-auto mt-2 max-w-lg font-display text-3xl md:text-4xl">
            Quiet word on new arrivals and the house&rsquo;s seasonal notes.
          </h2>
          <NewsletterForm dark className="mx-auto mt-8 max-w-sm" />
        </div>
      </section>
    </div>
  );
}
