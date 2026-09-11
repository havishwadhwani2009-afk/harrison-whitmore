import { SceneArt } from "@/components/scene-art";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = { title: "Our Story — Harrison Whitmore" };

const values = [
  {
    title: "Honest Cloth",
    body: "We work in natural fibres — wool, cotton, linen, cashmere — chosen for how they wear, not merely how they photograph.",
  },
  {
    title: "Unhurried Construction",
    body: "Every piece is cut with a full-canvas patience, favouring durability and drape over speed to shelf.",
  },
  {
    title: "Quiet Detail",
    body: "Our mark is found in the stitch, not the label — restraint is, to us, the truest form of confidence.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <SceneArt variant="estate" tone="stone" className="absolute inset-0 h-full w-full" label="The Harrison Whitmore estate" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 text-white md:px-10">
          <p className="mb-2 text-sm tracking-[0.2em] text-white/80">OUR STORY</p>
          <h1 className="max-w-xl font-display text-4xl md:text-6xl">A house built on restraint.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
        <ScrollReveal>
          <p className="font-display text-2xl leading-relaxed md:text-3xl">
            Harrison Whitmore was founded on a simple conviction: that true elegance rarely
            announces itself.
          </p>
          <p className="mt-6 leading-relaxed text-fg-muted">
            We draw from the coastlines of the Mediterranean and the townhouses of old Europe — the
            linen shirt worn to sail, the tweed sweater kept for the hills, the pleated trouser
            pressed for dinner. Our collections are built not around trend, but around the pieces a
            well-dressed life actually requires, made to be worn for decades rather than seasons.
          </p>
          <p className="mt-6 leading-relaxed text-fg-muted">
            Every garment carries our quiet mark — a small crest, sewn where only the wearer will
            find it — a private note between the house and the client, rather than a declaration to
            anyone else.
          </p>
        </ScrollReveal>
      </section>

      <section className="border-t border-border bg-bg-sunken">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
          <ScrollReveal>
            <h2 className="mb-12 text-center font-display text-3xl">What We Believe</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <h3 className="font-display text-xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{v.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
