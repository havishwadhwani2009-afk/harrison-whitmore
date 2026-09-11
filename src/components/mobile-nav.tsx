"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_STRUCTURE } from "@/lib/products";
import { CloseIcon, ChevronDown } from "./icons";
import type { Gender } from "@/lib/types";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<Gender | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg">
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-display text-xl tracking-wide">Menu</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-9 w-9 items-center justify-center cursor-pointer"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-6 pb-10">
        <ul className="space-y-1">
          {NAV_STRUCTURE.map((nav) => (
            <li key={nav.gender} className="border-b border-border">
              <button
                type="button"
                onClick={() => setExpanded(expanded === nav.gender ? null : nav.gender)}
                className="flex w-full items-center justify-between py-4 font-display text-3xl capitalize cursor-pointer"
              >
                {nav.gender}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${expanded === nav.gender ? "rotate-180" : ""}`}
                />
              </button>
              {expanded === nav.gender && (
                <div className="grid grid-cols-2 gap-6 pb-6">
                  {nav.categories.map((cat) => (
                    <div key={cat.category}>
                      <Link
                        href={`/${nav.gender}/${cat.category}`}
                        onClick={onClose}
                        className="mb-2 block text-[13px] tracking-wide text-fg-muted"
                      >
                        {cat.label}
                      </Link>
                      <ul className="space-y-2">
                        {cat.subcategories.map((sub) => (
                          <li key={sub.key}>
                            <Link
                              href={`/${nav.gender}/${cat.category}/${sub.key}`}
                              onClick={onClose}
                              className="text-base"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
          {[
            { href: "/new-arrivals", label: "Fall/Winter 2026–27" },
            { href: "/journal", label: "Journal" },
            { href: "/about", label: "Our Story" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <li key={item.href} className="border-b border-border">
              <Link href={item.href} onClick={onClose} className="block py-4 font-display text-2xl">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
