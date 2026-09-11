import { useId } from "react";

export type SceneTone = "cream" | "navy" | "olive" | "burgundy" | "stone" | "charcoal";
export type SceneVariant = "countryside" | "townhouse" | "coast" | "estate" | "harbor";

const SCENE_PALETTE: Record<SceneTone, { from: string; to: string; line: string }> = {
  cream: { from: "#f3ecdd", to: "#cfc39f", line: "#2c2717" },
  navy: { from: "#33507e", to: "#0a1220", line: "#efe7d6" },
  olive: { from: "#9a9c6d", to: "#464a2f", line: "#f1ede0" },
  burgundy: { from: "#96545b", to: "#2f1418", line: "#f1ede0" },
  stone: { from: "#ddd7c3", to: "#a49d84", line: "#2c2717" },
  charcoal: { from: "#5c626b", to: "#1c1f24", line: "#f1ede0" },
};

/** All scenes are composed as wide, bottom-anchored horizon bands so they crop gracefully
 * at any aspect ratio via preserveAspectRatio="xMidYMax slice" — only sky is ever lost. */
const VB_W = 200;
const VB_H = 100;

function Sun({ line, cx, cy }: { line: string; cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r="6" fill={line} fillOpacity="0.32" />;
}

function Cypress({ line, x, y, scale = 1 }: { line: string; x: number; y: number; scale?: number }) {
  return (
    <path
      d={`M${x} ${y} C${x - 2.4 * scale} ${y - 9 * scale} ${x - 2.2 * scale} ${y - 18 * scale} ${x} ${y - 26 * scale} C${x + 2.2 * scale} ${y - 18 * scale} ${x + 2.4 * scale} ${y - 9 * scale} ${x} ${y} Z`}
      fill={line}
      fillOpacity="0.5"
    />
  );
}

function Hills({ line, baseline, amplitude, opacity }: { line: string; baseline: number; amplitude: number; opacity: number }) {
  return (
    <path
      d={`M0 ${baseline} Q${VB_W * 0.15} ${baseline - amplitude} ${VB_W * 0.32} ${baseline - amplitude * 0.4} T${VB_W * 0.68} ${baseline - amplitude * 0.6} T${VB_W} ${baseline - amplitude * 0.3} L${VB_W} ${VB_H} L0 ${VB_H} Z`}
      fill={line}
      fillOpacity={opacity}
    />
  );
}

function Countryside({ line }: { line: string }) {
  return (
    <g>
      <Sun line={line} cx={168} cy={22} />
      <Hills line={line} baseline={58} amplitude={10} opacity={0.14} />
      <Hills line={line} baseline={70} amplitude={8} opacity={0.22} />
      {[18, 34, 96, 150, 168].map((x, i) => (
        <Cypress key={x} line={line} x={x} y={78 - (i % 2) * 3} scale={0.9 + (i % 3) * 0.15} />
      ))}
      <rect x={70} y={58} width={16} height={14} fill={line} fillOpacity="0.4" />
      <path d={`M68 58 L78 48 L88 58 Z`} fill={line} fillOpacity="0.46" />
    </g>
  );
}

function Townhouse({ line }: { line: string }) {
  const facades = [
    { x: 10, w: 26, h: 40 },
    { x: 38, w: 24, h: 50 },
    { x: 64, w: 22, h: 36 },
    { x: 88, w: 26, h: 46 },
    { x: 116, w: 24, h: 38 },
    { x: 142, w: 26, h: 48 },
    { x: 170, w: 22, h: 34 },
  ];
  return (
    <g>
      <line x1="0" y1="82" x2={VB_W} y2="82" stroke={line} strokeWidth="0.6" opacity="0.5" />
      {facades.map((f, i) => (
        <g key={f.x}>
          <rect x={f.x} y={82 - f.h} width={f.w} height={f.h} fill={line} fillOpacity={0.14 + (i % 3) * 0.06} />
          {Array.from({ length: Math.floor(f.h / 14) }).map((_, row) =>
            Array.from({ length: Math.floor(f.w / 9) }).map((__, col) => (
              <rect
                key={`${row}-${col}`}
                x={f.x + 3 + col * 9}
                y={82 - f.h + 6 + row * 14}
                width={4}
                height={6}
                fill={line}
                fillOpacity="0.5"
              />
            ))
          )}
        </g>
      ))}
    </g>
  );
}

function Coast({ line }: { line: string }) {
  return (
    <g>
      <Sun line={line} cx={26} cy={18} />
      <Hills line={line} baseline={66} amplitude={6} opacity={0.16} />
      <path d={`M0 78 Q${VB_W * 0.25} 74 ${VB_W * 0.5} 78 T${VB_W} 76 L${VB_W} ${VB_H} L0 ${VB_H} Z`} fill={line} fillOpacity="0.22" />
      <g transform="translate(120 50)">
        <path d="M0 24 L0 4 L3 6 L3 24 Z" fill={line} fillOpacity="0.5" />
        <path d="M2 6 L20 16 L2 22 Z" fill={line} fillOpacity="0.4" />
      </g>
    </g>
  );
}

function Estate({ line }: { line: string }) {
  return (
    <g>
      <Hills line={line} baseline={62} amplitude={9} opacity={0.16} />
      <Hills line={line} baseline={74} amplitude={6} opacity={0.24} />
      {[24, 150, 168].map((x, i) => (
        <Cypress key={x} line={line} x={x} y={76} scale={0.8 + (i % 2) * 0.2} />
      ))}
      <g transform="translate(85 40)">
        <rect x={0} y={20} width={30} height={22} fill={line} fillOpacity="0.32" />
        <path d="M-3 20 L15 6 L33 20 Z" fill={line} fillOpacity="0.42" />
        <rect x={13} y={30} width={4} height={12} fill={line} fillOpacity="0.55" />
        <rect x={4} y={26} width={4} height={5} fill={line} fillOpacity="0.5" />
        <rect x={22} y={26} width={4} height={5} fill={line} fillOpacity="0.5" />
      </g>
    </g>
  );
}

function Harbor({ line }: { line: string }) {
  return (
    <g>
      <line x1="0" y1="66" x2={VB_W} y2="66" stroke={line} strokeWidth="0.5" opacity="0.4" />
      <path d={`M0 80 Q${VB_W * 0.25} 76 ${VB_W * 0.5} 80 T${VB_W} 78 L${VB_W} ${VB_H} L0 ${VB_H} Z`} fill={line} fillOpacity="0.2" />
      {[30, 70, 110, 150].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 66 L${x} ${44 - (i % 2) * 4}`} stroke={line} strokeWidth="0.6" opacity="0.5" />
          <path d={`M${x + 1} ${47 - (i % 2) * 4} L${x + 14} ${54 - (i % 2) * 2} L${x + 1} 66 Z`} fill={line} fillOpacity="0.32" />
        </g>
      ))}
    </g>
  );
}

const SCENES: Record<SceneVariant, (p: { line: string }) => React.ReactElement> = {
  countryside: Countryside,
  townhouse: Townhouse,
  coast: Coast,
  estate: Estate,
  harbor: Harbor,
};

export function SceneArt({
  variant,
  tone,
  className,
  animate = false,
  label,
}: {
  variant: SceneVariant;
  tone: SceneTone;
  className?: string;
  animate?: boolean;
  label?: string;
}) {
  const uid = useId();
  const palette = SCENE_PALETTE[tone];
  const Scene = SCENES[variant];
  const gradientId = `scene-grad-${variant}-${tone}-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label={label ?? `${variant} scene`}
      className={`${className ?? ""} ${animate ? "animate-scene-pan" : ""}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <rect width={VB_W} height={VB_H} fill={`url(#${gradientId})`} />
      <Scene line={palette.line} />
    </svg>
  );
}
