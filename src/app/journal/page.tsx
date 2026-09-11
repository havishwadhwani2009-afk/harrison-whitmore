import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { SceneArt } from "@/components/scene-art";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = { title: "Journal — Harrison Whitmore" };

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
      <ScrollReveal className="mb-14 text-center">
        <p className="text-sm tracking-[0.15em] text-fg-muted">THE JOURNAL</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Notes from the House</h1>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {journalArticles.map((article, i) => (
          <ScrollReveal key={article.slug} delay={i * 100}>
            <Link href={`/journal/${article.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <SceneArt
                  variant={article.scene}
                  tone={article.tone}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  label={article.title}
                />
              </div>
              <p className="mt-4 text-xs tracking-wide text-fg-muted">
                {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <h2 className="mt-1 font-display text-xl">{article.title}</h2>
              <p className="mt-2 text-sm text-fg-muted">{article.excerpt}</p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
