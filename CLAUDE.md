# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Official website for **GearsMap S.A.S.**, a geospatial solutions and AI company. Localized marketing site (ES/EN/FR) with a home page, projects and case studies, climate-system pages (MRV, M&E), a contact form and dark mode.

## Commands

```bash
npm install                      # plain install; no --legacy-peer-deps needed
npx next typegen                 # once per fresh checkout: generates next-env.d.ts and .next/types
npm run dev                      # Dev server at localhost:3000
npm run build                    # Production build with TypeScript validation
npm run lint                     # ESLint
npm run typecheck                # TypeScript without emit (needs next typegen first)
npm run test:e2e                 # Playwright + axe suite against a production build (next start on :3100)
```

`npm run test:e2e` builds with `EXPOSE_TESTING_API=1` so `instant()` from `@next/playwright` works on `next start`. CI (`.github/workflows/ci.yml`) runs lint, typecheck and the e2e suite on every pull request.

## Stack

- **Next.js 16.4** (App Router, Cache Components, partial prefetching) / **React 19.3** / **TypeScript 5**
- **Tailwind CSS 4** with OKLCH design tokens in `app/globals.css`
- **shadcn/ui**-style primitives in `components/ui/` (Button uses `@radix-ui/react-slot`; there is no Radix dropdown or toast)
- Motion: CSS transitions and keyframes with reduced-motion guards, React 19.3 `<ViewTransition>` for shared-element morphs, `document.startViewTransition` for the theme switch. No Framer Motion.
- Theme: a native inline script (`lib/theme-script.ts`, rendered by `components/theme-script.tsx`) plus `lib/theme.ts`. No next-themes.
- **Cobe** for the hero globe (deferred, skipped on low-end and phone-sized devices)
- **@vercel/postgres** (Neon) for the database, **Nodemailer** / **Microsoft Graph** for email, **Zod** for API validation

## Architecture

### Routing & Pages
`app/[locale]/layout.tsx` is the root layout (it renders `<html>`); there is no `app/layout.tsx`. It renders the localized `Header`, `Footer`, skip link and `ScrollToTop`. `app/[locale]/page.tsx` is the home page for `/es`, `/en` and `/fr`; interactive islands live in `components/home/`. Other localized routes: `proyectos/`, `servicios/geovisores/`, `sistemas-climaticos/` (hub, `mrv`, `monitoreo-y-evaluacion`), `privacidad/` and `terminos/`. Slugs are Spanish in every locale; legacy and translated slugs redirect in `next.config.mjs`.

### API
- `app/api/contact/route.ts` is the only local API route. It accepts `application/json` only, validates with Zod, drops honeypot and too-fast submissions with a silent 200, saves to Postgres, sends the admin email via Microsoft Graph or SMTP, and sends the localized confirmation email after the response (`after()`).
- All other `/api/*` requests are proxied to `https://gearsmap-api.vercel.app/api/` via rewrites in `next.config.mjs`.

### Content and Internationalization (i18n)
Custom dictionary-based system: **do not use external i18n libraries**. The localized URL is the source of truth; pages receive their dictionary explicitly.
- `lib/translations.ts`: shared UI strings (ES default, EN, FR), `Locale` and `getDictionary()`.
- `lib/project-content.ts`: project and case-study copy. `lib/projects.ts` holds the project data model.
- `lib/team-content.ts`: founders copy. `lib/team.ts` holds the founders data.
- `lib/services.ts`: service pages copy.
- `lib/climate.ts`: climate-system (MRV, M&E) pages copy.

Owner-only facts (metrics, clients, dates, bios) are typed `T | null` and render nothing while null. Never fill them with invented content.

### Styling Conventions
- Always use the `cn()` utility from `@/lib/utils` for merging Tailwind classes.
- Layout width comes from `.site-container`.
- Icons: `lucide-react` for general icons, `components/icons/brand-icons.tsx` for brand marks, optimized local assets for logos (`public/images/gearsmap-wordmark.png`).
- Path alias: `@/*` maps to the project root.

### Email Templates
React Email templates in `emails/`: `contact-submission.tsx` (admin notification, Spanish) and `contact-confirmation.tsx` (visitor confirmation in es/en/fr). Both use the PNG wordmark because SVG does not render in Gmail or Outlook.

## Environment Variables

| Variable | Purpose |
| :--- | :--- |
| `POSTGRES_URL` | Pooled Neon/Postgres connection string |
| `POSTGRES_URL_NON_POOLING` | Direct Neon connection string (preferred when set) |
| `DATABASE_URL` | Fallback; treated as pooled or direct based on the URL |
| `CONTACT_REQUIRE_DB` | `true` makes a failed DB save return 500 |
| `CONTACT_REQUIRE_EMAIL` | `true` makes a failed admin email return 500 |
| `CONTACT_EMAIL_ENABLED` | `false` disables all contact email |
| `CONTACT_EMAIL_PROVIDER` | `graph`, `smtp` (default) or `none` |
| `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_CC` | Comma-separated admin recipients (default `gearsmap@gearsmap.com`) |
| `CONTACT_EMAIL_CONFIRMATION_ENABLED` | `false` disables the visitor confirmation email |
| `CONTACT_EMAIL_LOGO_URL` | Overrides the email logo (default `https://gearsmap.com/images/gearsmap-wordmark.png`) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | SMTP transport |
| `M365_TENANT_ID` (or `M365_TENANT` / `M365_TENANT_DOMAIN`), `M365_CLIENT_ID`, `M365_CLIENT_SECRET`, `M365_SENDER`, `M365_AUTHORITY` | Microsoft Graph app-only email (`Mail.Send` application permission) |
| `NEXT_PUBLIC_SITE_YEAR` | Copyright year in the footer (default `2026`) |
| `EXPOSE_TESTING_API` | `1` at build time exposes the instant-navigation testing API (e2e only) |
