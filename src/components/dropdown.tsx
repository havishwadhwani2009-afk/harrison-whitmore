"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { ChevronDown } from "./icons";

export function Dropdown({
  label,
  active,
  children,
}: {
  label: string;
  active?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 whitespace-nowrap border px-4 py-2 text-sm transition-colors cursor-pointer ${
          active ? "border-fg" : "border-border-strong text-fg-muted hover:text-fg"
        }`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 min-w-[220px] border border-border bg-bg-elevated p-4 shadow-lift">
          {children}
        </div>
      )}
    </div>
  );
}
