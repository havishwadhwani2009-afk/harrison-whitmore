# Harrison Whitmore

An ultra-premium old-money fashion e-commerce site for men's and women's clothing, built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notable details

- **Light/dark mode**: toggle in the header; persisted to `localStorage`, defaults to the system preference on first visit.
- **Product imagery**: this build has no access to real photography or an AI image-generation tool, so all product and lifestyle imagery is rendered as elegant, deterministic SVG line-art and duotone gradient panels (`src/components/garment-art.tsx`, `src/components/scene-art.tsx`) in the brand's cream/navy palette. These are drop-in replaceable with real photography later — swap the `GarmentArt`/`SceneArt` components for `<Image>` calls once real assets exist.
- **Cart, wishlist, account, and orders** are stored client-side in `localStorage` — there is no real backend or authentication.
- **Checkout** is fully simulated: no real payment processing occurs. Card/Apple Pay/Google Pay are UI-only.
- **Gift cards** are simulated: purchasing one generates a code in the form `HW-<amount>-XXXXXX`, redeemable at checkout by parsing that prefix.
- **Admin dashboard** (`/admin`, password `whitmore-house`) reads and writes `src/data/products.json` directly via API routes (`src/app/api/admin/products`). This works in local development; on a serverless production host the filesystem is typically read-only, so a real deployment would need to swap this for a database.

## Project structure

- `src/app` — routes (App Router)
- `src/components` — shared UI components
- `src/context` — client-side state (theme, cart, wishlist, auth/orders)
- `src/data` — product and journal content
- `src/lib` — product/catalogue helper functions and types
