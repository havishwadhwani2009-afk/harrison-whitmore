import { notFound } from "next/navigation";
import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { SceneArt } from "@/components/scene-art";

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <SceneArt variant={article.scene} tone={article.tone} className="absolute inset-0 h-full w-full" label={article.title} />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      <div className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        <Link href="/journal" className="text-sm text-fg-muted hover:text-fg">
          &larr; Journal
        </Link>
        <p className="mt-6 text-xs tracking-wide text-fg-muted">
          {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h1 className="mt-2 font-display text-4xl">{article.title}</h1>
        <div className="mt-8 space-y-5 text-fg-muted leading-relaxed">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
