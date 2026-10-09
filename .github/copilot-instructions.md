# GearsMap Website - Copilot Instructions

## Project Overview
Official website for GearsMap S.A.S., built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS 4**. The project focuses on geospatial solutions and AI.

## Tech Stack & Architecture
- **Framework:** Next.js 16 (App Router)
- **UI:** Tailwind CSS 4, Radix UI, shadcn/ui (located in `components/ui/`)
- **State Management:** React Context for global state (e.g., `LanguageContext`)
- **Forms:** `react-hook-form` + `zod` for validation
- **Database:** Vercel Postgres (`@vercel/postgres`)
- **Email:** `@react-email/components` + `nodemailer` (templates in `emails/`)

## Critical Conventions

### 1. Internationalization (i18n)
The project uses a custom context-based i18n system. **Do not use external i18n libraries.**
- **Hook:** `useLanguage()` from `@/lib/language-context`
- **Translations:** Centralized in `lib/translations.ts`
- **Usage Example:**
  ```tsx
  const { t, language } = useLanguage();
  return <h1>{t.hero.title}</h1>;
  ```
- **Supported Languages:** `ES` (default), `EN`, `FR`.

### 2. Styling & Components
- **Tailwind CSS 4:** Use modern Tailwind 4 features.
- **Class Merging:** Always use the `cn` utility from `@/lib/utils.ts`.
- **Icons:** Use `lucide-react` for general icons and `@icons-pack/react-simple-icons` for brand icons.
- **Animations:** Use CSS transitions/keyframes with reduced-motion guards and React `<ViewTransition>`; no animation libraries.
- **Key Components:**
  - **Globe 3D:** Interactive globe in the hero section (uses `cobe`).
  - **Smooth Scroll:** Navigation links use smooth scroll to IDs.

### 3. API & Backend
- **Routes:** Located in `app/api/`.
- **Validation:** Use `zod` schemas for request body validation.
- **Database Access:** Use `@vercel/postgres` (see `app/api/contact/route.ts` for connection patterns).

### 4. Development Workflow
- **Installation:** `npm install` (no `--legacy-peer-deps`), then `npx next typegen` once per fresh checkout.
- **Scripts:**
  - `npm run dev`: Start development server.
  - `npm run build`: Production build.

## Key Files for Reference
- `lib/translations.ts`: Source of truth for all text content.
- `lib/language-context.tsx`: i18n logic.
- `app/api/contact/route.ts`: Example of API route with DB and Email integration.
- `components/ui/`: Reusable UI primitives.
