import { useId } from "react";
import type { Subcategory } from "@/lib/types";

export type Tone = "cream" | "navy" | "olive" | "burgundy" | "stone" | "charcoal";

export const TONE_PALETTE: Record<Tone, { from: string; to: string; line: string }> = {
  cream: { from: "#efe7d6", to: "#d9cdac", line: "#3a3324" },
  navy: { from: "#1f3153", to: "#0c1626", line: "#efe7d6" },
  olive: { from: "#787c56", to: "#4a4d33", line: "#f1ede0" },
  burgundy: { from: "#6b333a", to: "#3c1a1f", line: "#f1ede0" },
  stone: { from: "#c7c1ae", to: "#9d9781", line: "#33301f" },
  charcoal: { from: "#454a52", to: "#24272c", line: "#f1ede0" },
};

type IconProps = { stroke: string };

/** Minimal single-line garment illustrations, hand-drawn in a restrained editorial style. */
const ICONS: Record<Subcategory, (p: IconProps) => React.ReactElement> = {
  shirts: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M42 24 L48 32 L60 32 L66 24 L82 32 L76 46 L70 42 L70 96 L38 96 L38 42 L32 46 L26 32 Z" />
      <path d="M48 32 L54 40 L60 32" />
      <path d="M54 40 L54 96" strokeDasharray="1 5" />
      <circle cx="54" cy="52" r="0.8" fill={stroke} />
      <circle cx="54" cy="64" r="0.8" fill={stroke} />
      <circle cx="54" cy="76" r="0.8" fill={stroke} />
      <circle cx="54" cy="88" r="0.8" fill={stroke} />
    </g>
  ),
  polos: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M45 26 L48 33 L60 33 L63 26 L82 34 L76 47 L70 43 L70 96 L38 96 L38 43 L32 47 L26 34 Z" />
      <path d="M48 33 L54 40 L60 33" />
      <path d="M54 40 L54 56" />
      <circle cx="51" cy="46" r="0.8" fill={stroke} />
      <circle cx="51" cy="52" r="0.8" fill={stroke} />
    </g>
  ),
  sweaters: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 30 L48 24 L60 24 L68 30 L84 40 L76 52 L70 47 L70 96 L38 96 L38 47 L32 52 L24 40 Z" />
      <path d="M48 24 Q54 32 60 24" />
      <path d="M38 88 L70 88" opacity="0.5" />
      <path d="M38 92 L70 92" opacity="0.5" />
    </g>
  ),
  cardigans: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 30 L48 25 L54 30 L54 96 L38 96 L38 47 L32 52 L24 40 Z" />
      <path d="M68 30 L60 25 L54 30" />
      <path d="M56 30 L70 96 L86 96 L70 47 L76 52 L84 40 Z" />
      <circle cx="53" cy="46" r="0.8" fill={stroke} />
      <circle cx="53" cy="58" r="0.8" fill={stroke} />
      <circle cx="53" cy="70" r="0.8" fill={stroke} />
      <rect x="42" y="66" width="10" height="8" rx="1" />
    </g>
  ),
  trousers: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M36 22 L84 22 L86 30 L64 30 L64 46 L74 96 L62 96 L56 52 L50 96 L38 96 L46 46 L46 30 L34 30 Z" />
      <path d="M60 30 L60 50" opacity="0.5" />
      <path d="M40 26 L80 26" opacity="0.5" />
    </g>
  ),
  chinos: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M38 22 L82 22 L84 30 L64 30 L64 46 L72 96 L61 96 L56 54 L51 96 L40 96 L47 46 L47 30 L36 30 Z" />
      <path d="M64 34 L74 36" opacity="0.6" />
      <path d="M56 30 L56 48" opacity="0.4" />
    </g>
  ),
  jeans: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M36 22 L84 22 L86 30 L65 30 L65 46 L75 96 L62 96 L56 52 L50 96 L37 96 L45 46 L45 30 L34 30 Z" />
      <path d="M40 26 L52 26 L52 40" opacity="0.6" />
      <path d="M68 34 L78 36" opacity="0.6" />
      <rect x="41" y="27" width="7" height="7" opacity="0.6" />
    </g>
  ),
  watches: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="52" y="14" width="16" height="22" rx="3" />
      <rect x="52" y="84" width="16" height="22" rx="3" />
      <circle cx="60" cy="60" r="22" />
      <circle cx="60" cy="60" r="1" fill={stroke} />
      <path d="M60 46 L60 60 L70 66" />
      <path d="M60 40 L60 43" />
      <path d="M60 77 L60 80" />
      <path d="M77 60 L80 60" />
      <path d="M40 60 L43 60" />
    </g>
  ),
  eyewear: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="24" y="46" width="30" height="24" rx="10" />
      <rect x="66" y="46" width="30" height="24" rx="10" />
      <path d="M54 54 Q60 48 66 54" />
      <path d="M24 54 L12 50" />
      <path d="M96 54 L108 50" />
    </g>
  ),
  belts: ({ stroke }) => (
    <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="52" width="60" height="16" rx="2" />
      <rect x="74" y="50" width="18" height="20" rx="2" />
      <circle cx="83" cy="60" r="3" />
      <path d="M92 60 L104 60" />
      <circle cx="26" cy="60" r="0.8" fill={stroke} />
      <circle cx="34" cy="60" r="0.8" fill={stroke} />
      <circle cx="42" cy="60" r="0.8" fill={stroke} />
    </g>
  ),
};

type TextureFamily = "rib" | "twill" | "herringbone" | "denim" | "grain" | "dial";

const SUBCATEGORY_TEXTURE: Record<Subcategory, TextureFamily> = {
  shirts: "twill",
  polos: "rib",
  sweaters: "rib",
  cardigans: "rib",
  trousers: "herringbone",
  chinos: "twill",
  jeans: "denim",
  watches: "dial",
  eyewear: "grain",
  belts: "grain",
};

function TexturePattern({ id, family, line }: { id: string; family: TextureFamily; line: string }) {
  switch (family) {
    case "rib":
      return (
        <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke={line} strokeWidth="1.1" opacity="0.35" />
          <line x1="3" y1="0" x2="3" y2="6" stroke={line} strokeWidth="0.6" opacity="0.2" />
        </pattern>
      );
    case "twill":
      return (
        <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={line} strokeWidth="2" opacity="0.22" />
        </pattern>
      );
    case "herringbone":
      return (
        <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6 L6 0 L12 6" stroke={line} strokeWidth="1" fill="none" opacity="0.28" />
          <path d="M0 12 L6 6 L12 12" stroke={line} strokeWidth="1" fill="none" opacity="0.28" />
        </pattern>
      );
    case "denim":
      return (
        <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={line} strokeWidth="2.2" opacity="0.3" />
        </pattern>
      );
    case "dial":
      return (
        <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="9" stroke={line} strokeWidth="0.6" fill="none" opacity="0.3" />
          <circle cx="10" cy="10" r="5" stroke={line} strokeWidth="0.6" fill="none" opacity="0.22" />
        </pattern>
      );
    case "grain":
    default:
      return (
        <pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.5" fill={line} opacity="0.3" />
          <circle cx="5" cy="4" r="0.4" fill={line} opacity="0.22" />
        </pattern>
      );
  }
}

export function GarmentArt({
  subcategory,
  tone,
  variant = "flat",
  className,
  label,
}: {
  subcategory: Subcategory;
  tone: Tone;
  variant?: "flat" | "texture";
  className?: string;
  label?: string;
}) {
  const uid = useId();
  const palette = TONE_PALETTE[tone];
  const Icon = ICONS[subcategory];
  const gradientId = `grad-${subcategory}-${tone}-${uid}`;
  const patternId = `pattern-${subcategory}-${tone}-${uid}`;
  const texture = SUBCATEGORY_TEXTURE[subcategory];

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={label ?? `${subcategory} illustration`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
        <TexturePattern id={patternId} family={texture} line={palette.line} />
      </defs>
      <rect width="120" height="120" fill={`url(#${gradientId})`} />
      {variant === "texture" ? (
        <>
          <rect width="120" height="120" fill={`url(#${patternId})`} />
          <circle cx="60" cy="60" r="30" fill="none" stroke={palette.line} strokeWidth="0.5" opacity="0.35" />
        </>
      ) : (
        <Icon stroke={palette.line} />
      )}
      <text
        x="6"
        y="114"
        fontSize="4"
        letterSpacing="2"
        fill={palette.line}
        opacity="0.45"
        fontFamily="serif"
      >
        HARRISON WHITMORE
      </text>
    </svg>
  );
}
