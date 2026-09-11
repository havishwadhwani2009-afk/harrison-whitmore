"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";
import { NAV_STRUCTURE } from "@/lib/products";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { SearchOverlay } from "./search-overlay";
import { ThemeToggle } from "./theme-toggle";
import { SearchIcon, HeartIcon, BagIcon, UserIcon, MenuIcon } from "./icons";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { count } = useCart();
  const { ids } = useWishlist();
  const { customer, logout } = useAuth();

  return (
    <>
      <header className="relative z-30 bg-bg">
        <div className="grid grid-cols-3 items-center px-5 py-5 md:px-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center md:hidden cursor-pointer"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>

          <Link href="/" className="justify-self-center text-center">
            <span className="font-display text-[22px] tracking-[0.12em] md:text-[28px]">
              HARRISON WHITMORE
            </span>
          </Link>

          <div className="flex items-center justify-self-end gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hidden h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-overlay sm:flex cursor-pointer"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>

            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAccountOpen((o) => !o)}
                aria-label="Account"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-overlay cursor-pointer"
              >
                <UserIcon className="h-[18px] w-[18px]" />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full w-56 border border-border bg-bg-elevated py-2 shadow-lift">
                  {customer ? (
                    <>
                      <p className="px-4 py-2 text-sm text-fg-muted">
                        Signed in as <span className="text-fg">{customer.name}</span>
                      </p>
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm hover:bg-overlay"
                        onClick={() => setAccountOpen(false)}
                      >
                        My Account &amp; Orders
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setAccountOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-overlay cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm hover:bg-overlay"
                        onClick={() => setAccountOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/account?tab=register"
                        className="block px-4 py-2 text-sm hover:bg-overlay"
                        onClick={() => setAccountOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative hidden h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-overlay sm:flex"
            >
              <HeartIcon className="h-[18px] w-[18px]" />
              {ids.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-on-accent">
                  {ids.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-overlay"
            >
              <BagIcon className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-on-accent">
                  {count}
                </span>
              )}
            </Link>

            <ThemeToggle />
          </div>
        </div>

        <nav className="hidden justify-center gap-10 border-t border-border py-3 md:flex">
          {NAV_STRUCTURE.map((nav) => (
            <div key={nav.gender} className="group">
              <Link
                href={`/${nav.gender}`}
                className="text-[15px] capitalize tracking-wide transition-colors hover:text-fg-muted"
              >
                {nav.gender}
              </Link>
              <MegaMenu gender={nav.gender} />
            </div>
          ))}
          <Link href="/new-arrivals" className="text-[15px] tracking-wide transition-colors hover:text-fg-muted">
            Fall/Winter 2026–27
          </Link>
          <Link href="/journal" className="text-[15px] tracking-wide transition-colors hover:text-fg-muted">
            Journal
          </Link>
          <Link href="/about" className="text-[15px] tracking-wide transition-colors hover:text-fg-muted">
            Our Story
          </Link>
        </nav>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
