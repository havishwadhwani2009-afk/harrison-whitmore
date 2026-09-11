"use client";

import { useEffect, useRef, ReactNode } from "react";

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safety net: guarantee content becomes visible even if the observer
    // never fires (e.g. slow JS, automated capture tools, edge cases).
    const fallback = setTimeout(() => el.classList.add("is-visible"), 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
          clearTimeout(fallback);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className ?? ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
