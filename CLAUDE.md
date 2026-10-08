# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Official website for **GearsMap S.A.S.** — a geospatial solutions and AI company. Single-page marketing site with contact form, i18n, and dark mode.

## Commands

```bash
npm install --legacy-peer-deps   # MUST use --legacy-peer-deps (React 19 peer dep conflicts)
npm run dev                      # Dev server at localhost:3000
npm run build                    # Production build with TypeScript validation
npm run lint                     # ESLint
npm run typecheck                # TypeScript without emit
npm run test:e2e                 # Playwright + axe smoke/a11y suite
```

## Stack

- **Next.js 16** (App Router) / **React 19** / **TypeScript 5**
- **Tailwind CSS 4** with OKLCH design tokens in `app/globals.css`
- **shadcn/ui** (New York style) + **Radix UI** primitives in `components/ui/`
- **Framer Motion** for animations, **Cobe** for 3D globe
- **@vercel/postgres** (Neon) for database, **Nodemailer** / **Microsoft Graph** for email
- Accessible client form + **Zod** validation for the API

## Architecture

### Routing & Pages
Localized App Router site. `app/[locale]/page.tsx` renders the server-based landing page for `/es`, `/en` and `/fr`; interactive behavior is isolated in `components/home/`. Additional localized routes cover `privacidad/` and `terminos/`.

### API
- `app/api/contact/route.ts` — the only local API route. Handles contact form submissions with Zod validation, saves to Postgres, sends email via Microsoft Graph or SMTP with graceful degradation.
- All other `/api/*` requests are proxied to `https://gearsmap-api.vercel.app/api/` via Next.js rewrites in `next.config.mjs`.

### Internationalization (i18n)
Custom dictionary-based system — **do not use external i18n libraries**.
- `lib/translations.ts` — all translatable strings (ES default, EN, FR), `Locale` and `getDictionary()`.
- Localized URL is the source of truth; localized pages receive their dictionary explicitly.

### Layout & Providers
`app/layout.tsx` owns global providers. `app/[locale]/layout.tsx` renders the localized `Header`, `Footer`, skip link and `ScrollToTop`.

### Styling Conventions
- Always use the `cn()` utility from `@/lib/utils` for merging Tailwind classes.
- Icons: `lucide-react` for general icons and optimized local assets for brand logos.
- Path alias: `@/*` maps to the project root.

### Email Templates
React Email templates in `emails/` — `contact-submission.tsx` (admin notification) and `contact-confirmation.tsx` (user confirmation).

## Environment Variables

Required for contact form functionality:
- `POSTGRES_URL_NON_POOLING` — Neon direct connection
- `CONTACT_EMAIL_ENABLED`, `CONTACT_EMAIL_PROVIDER` (`graph` or `smtp`)
- `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_CC`
- `M365_TENANT_ID`, `M365_CLIENT_ID`, `M365_CLIENT_SECRET`, `M365_SENDER` — for Microsoft Graph email

## Active Technologies
- TypeScript 5 / React 19 + Next.js 16 (App Router), Tailwind CSS 4, Cobe (3D globe), Framer Motion, Radix UI, next-themes, shadcn/ui (001-design-review-fixes)
- N/A (no data model changes) (001-design-review-fixes)

## Recent Changes
- 001-design-review-fixes: Added TypeScript 5 / React 19 + Next.js 16 (App Router), Tailwind CSS 4, Cobe (3D globe), Framer Motion, Radix UI, next-themes, shadcn/ui
