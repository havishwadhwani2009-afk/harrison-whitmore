"use client";

import { useState, ReactNode } from "react";
import { PlusIcon, MinusIcon } from "./icons";

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-display text-lg">{title}</span>
        {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
      </button>
      {open && <div className="pb-5 text-sm leading-relaxed text-fg-muted">{children}</div>}
    </div>
  );
}
