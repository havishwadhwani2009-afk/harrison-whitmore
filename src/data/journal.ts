import type { SceneVariant, SceneTone } from "@/components/scene-art";

export type JournalArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  scene: SceneVariant;
  tone: SceneTone;
  body: string[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "the-case-for-a-single-good-coat",
    title: "The Case for a Single Good Coat",
    excerpt: "Why one well-made piece will always outlast a wardrobe of compromises.",
    date: "2026-01-14",
    scene: "townhouse",
    tone: "charcoal",
    body: [
      "There is a certain arithmetic to dressing well that has little to do with quantity. A single coat, cut correctly and kept for a decade, will outperform — in both cost and character — a dozen bought in haste.",
      "We are often asked why our collections remain deliberately small. The answer is simple: we would rather make one trouser exceptionally than ten adequately. It is a slower way to build a wardrobe, but it is the only way we know to build one that lasts.",
      "Consider the coat you already own and love. It is unlikely to be the newest. It is likely the one that fit first, and fit longest.",
    ],
  },
  {
    slug: "dressing-for-the-mediterranean-summer",
    title: "Dressing for the Mediterranean Summer",
    excerpt: "Linen, light colour, and the art of looking unbothered by the heat.",
    date: "2025-06-02",
    scene: "coast",
    tone: "olive",
    body: [
      "The Mediterranean has never rewarded effort that shows. The best-dressed figure on any terrace is rarely the most elaborate — simply the most at ease.",
      "Linen remains, in our view, undefeated for the season: it breathes, it creases honestly, and it grows only more charming with wear. Paired with a cotton chino and little else, it asks nothing of you but good company.",
      "Colour, too, should be left to do less. Cream, stone, and a single deep olive will take you from a morning swim to a late dinner without once feeling out of place.",
    ],
  },
  {
    slug: "the-quiet-return-of-the-cardigan",
    title: "The Quiet Return of the Cardigan",
    excerpt: "An old favourite, reconsidered for a life lived indoors and out.",
    date: "2025-11-20",
    scene: "estate",
    tone: "burgundy",
    body: [
      "The cardigan has long suffered an image it never deserved — too often dismissed as a garment for the study, rarely for the street.",
      "We would argue otherwise. Layered over a shirt and beneath a coat, a well-cut cardigan does more useful work than almost anything else in the wardrobe: it warms without bulk, and dresses down a tailored trouser without ever looking careless.",
      "This season, we return to it in a heavier lambswool, cut generously enough to layer, and finished with the same restraint as everything else we make.",
    ],
  },
];
