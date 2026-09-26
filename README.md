# Furnt — Interior & Furniture Website

A responsive recreation of the supplied 24.5-second furniture website reference. Cream and olive surfaces, Comfortaa typography, natural wood photography, staggered product reveals, word-by-word scroll reveal, a pinned moving photo collage, and image-on-hover category rows.

## Run

Requires Node.js 22.13+ and pnpm. Use `pnpm install`, then `pnpm dev`. `pnpm build` creates the Cloudflare Worker and client assets. `pnpm exec tsc --noEmit` checks TypeScript.

The app uses React 19, the Next.js App Router API through Vinext, TypeScript, and Cloudflare D1. This is a full server application with working route handlers, not a static preview export. Standard Next.js hosting requires replacing the Cloudflare database adapter and build command; do not deploy the Worker build as a static folder.

## Content and appearance

- `app/page.tsx`: copy, product data, navigation, and dialogs.
- `app/globals.css`: theme, responsive layouts, motion, and reduced-motion support.
- `public/images/`: self-hosted WebP assets. The hero, chair/shelf, and sofa photographs were recreated from the supplied reference. Small product and collage photographs were extracted from the supplied video and retain its limited resolution.
- `public/fonts/`: locally hosted Comfortaa and DM Sans; no runtime font or image requests to third parties.

The brand, product names, prices, and photos are illustrative reference content. Replace them with the real business catalogue before using the website to take orders. No payment flow is included. No fabricated address, telephone number, or email destination is used.

## Forms

`POST /api/newsletter` stores unique subscribers in D1. `POST /api/enquiry` validates and stores enquiries, deduplicates short-window retries, and limits repeated submissions from one email. Inputs stay on screen after errors; success appears only after storage confirms. Enquiries are saved for review; email/Telegram delivery is not configured.

The logical D1 binding is `DB`. Schema lives in `db/schema.ts`; migrations in `drizzle/` must be applied before serving forms. No public route exposes subscriber or enquiry records. For other hosts, replace `lib/database.ts` with that host’s persistent database client.

## Motion and accessibility

Native scroll and touch behaviour are retained. Scroll animations update through a single animation-frame callback. Cards use intersection observers and transform/opacity transitions. `prefers-reduced-motion` turns off movement and converts the pinned collage into a normal grid. Navigation, product details, enquiries, and menus work with keyboard input and accessible Radix dialogs.

## Reference

Visual direction reconstructed from the user-supplied `19487.mp4`. The original high-resolution design file, source photographs, and animation timeline were not supplied; this is a close recreation, not a claim of pixel-identical source recovery.
