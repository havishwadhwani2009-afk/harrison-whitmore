import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { href: "/men", label: "Men" },
      { href: "/women", label: "Women" },
      { href: "/new-arrivals", label: "New Arrivals" },
      { href: "/men/accessories", label: "Accessories" },
      { href: "/gift-cards", label: "Gift Cards" },
    ],
  },
  {
    title: "The House",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/journal", label: "Journal" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Client Services",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/size-guide", label: "Size Guide" },
      { href: "/shipping-returns", label: "Shipping & Returns" },
      { href: "/account", label: "My Account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/returns-policy", label: "Returns Policy" },
    ],
  },
];

const socials = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "Pinterest" },
  { href: "#", label: "Facebook" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-sunken">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-2xl tracking-[0.08em]">HARRISON WHITMORE</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              Join our circle for quiet word of new arrivals and the house&rsquo;s seasonal notes.
            </p>
            <NewsletterForm className="mt-5 max-w-xs" />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-[13px] tracking-wide text-fg-muted">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-fg-muted">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-fg-muted md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} Harrison Whitmore. All rights reserved.</p>
          <div className="flex gap-6">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="transition-colors hover:text-fg">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
