# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Official website for **GearsMap S.A.S.** — a geospatial solutions and AI company. Single-page marketing site with contact form, i18n, and dark mode.

## Commands

```bash
npm install --legacy-peer-deps   # MUST use --legacy-peer-deps (React 19 peer dep conflicts)
npm run dev                      # Dev server at localhost:3000
npm run build                    # Production build (TS errors are ignored in config)
npm run lint                     # ESLint
```

## Stack

- **Next.js 16** (App Router) / **React 19** / **TypeScript 5**
- **Tailwind CSS 4** with OKLCH design tokens in `app/globals.css`
- **shadcn/ui** (New York style) + **Radix UI** primitives in `components/ui/`
- **Framer Motion** for animations, **Cobe** for 3D globe
- **@vercel/postgres** (Neon) for database, **Nodemailer** / **Microsoft Graph** for email
- **React Hook Form** + **Zod** for forms

## Architecture

### Routing & Pages
Single-page app with anchor-based navigation. `app/page.tsx` is the main page (~750 lines, client component) containing hero, services, team, and contact sections. Additional routes: `privacidad/`, `terminos/`.

### API
- `app/api/contact/route.ts` — the only local API route. Handles contact form submissions with Zod validation, saves to Postgres, sends email via Microsoft Graph or SMTP with graceful degradation.
- All other `/api/*` requests are proxied to `https://gearsmap-api.vercel.app/api/` via Next.js rewrites in `next.config.mjs`.

### Internationalization (i18n)
Custom context-based system — **do not use external i18n libraries**.
- `lib/language-context.tsx` — React context provider, persists selection to localStorage
- `lib/translations.ts` — all translatable strings (ES default, EN, FR)
- Usage: `const { t, language } = useLanguage(); <h1>{t.hero.title}</h1>`

### Layout & Providers
`app/layout.tsx` wraps the app with `ThemeProvider` (next-themes) and `LanguageProvider`. Global layout includes `Header`, `Footer`, and `ScrollToTop`.

### Styling Conventions
- Always use the `cn()` utility from `@/lib/utils` for merging Tailwind classes.
- Icons: `lucide-react` for general icons, `@icons-pack/react-simple-icons` for brand icons.
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
