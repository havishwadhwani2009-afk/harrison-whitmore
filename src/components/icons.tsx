type IconProps = { className?: string; strokeWidth?: number };

const base = "stroke-current fill-none";

export function SearchIcon({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19.5 19.5 15 15" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ className, strokeWidth = 1.4, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${filled ? "fill-current stroke-current" : base} ${className ?? ""}`}
      strokeWidth={strokeWidth}
    >
      <path
        d="M12 20.2 4.8 13.1c-2-2-2-5.2 0-7.1 2-2 5.2-2 7.1 0l.1.1.1-.1c2-2 5.2-2 7.1 0 2 2 2 5.1 0 7.1L12 20.2Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BagIcon({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <path d="M6.5 8h11l1 12.5h-13L6.5 8Z" strokeLinejoin="round" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5" strokeLinecap="round" />
    </svg>
  );
}

export function SunIcon({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="4.2" />
      <g strokeLinecap="round">
        <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
      </g>
    </svg>
  );
}

export function MoonIcon({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <path d="M20 14.5a8.5 8.5 0 1 1-9-11.9 7 7 0 0 0 9 11.9Z" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <g strokeLinecap="round">
        <path d="M3.5 7h17" />
        <path d="M3.5 12h17" />
        <path d="M3.5 17h17" />
      </g>
    </svg>
  );
}

export function CloseIcon({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <g strokeLinecap="round">
        <path d="M5 5l14 14" />
        <path d="M19 5 5 19" />
      </g>
    </svg>
  );
}

export function ChevronDown({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <path d="M5 8.5 12 15l7-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${filled ? "fill-current stroke-current" : "fill-none stroke-current"} ${className ?? ""}`}
      strokeWidth={1}
    >
      <path d="M12 3.5 14.7 9l6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.4-4.2 6-.9L12 3.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <g strokeLinecap="round">
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </g>
    </svg>
  );
}

export function MinusIcon({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} strokeWidth={strokeWidth}>
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
