<!--
  Sync Impact Report
  ==================
  Version change: N/A → 1.0.0 (initial ratification)

  Added principles:
    - I. Minimalist Aesthetic
    - II. Accessibility First
    - III. Internationalization Integrity
    - IV. Performance Budget
    - V. Component-Driven Architecture
    - VI. Graceful Degradation

  Added sections:
    - Technology Constraints
    - Quality Gates

  Templates requiring updates:
    ✅ .specify/templates/plan-template.md — no changes needed (Constitution Check generic)
    ✅ .specify/templates/spec-template.md — no changes needed (user stories generic)
    ✅ .specify/templates/tasks-template.md — no changes needed (phase structure generic)

  Follow-up TODOs: none
-->

# GearsMap Website Constitution

## Core Principles

### I. Minimalist Aesthetic

Every UI decision MUST prioritize clarity and restraint over decoration.

- Generous whitespace MUST separate content sections; avoid visual clutter.
- Typography hierarchy MUST use Manrope at defined scale steps—no arbitrary sizes.
- Color tokens MUST come from the OKLCH palette defined in `app/globals.css`; no hex/rgb literals in components.
- Animations MUST be subtle and purposeful (< 300ms, ease-out). Decorative motion that does not aid comprehension is prohibited.
- Dark mode MUST receive equal design attention; every component MUST render correctly in both themes.
- Borders, shadows, and dividers SHOULD be used sparingly—prefer spacing and background contrast to separate elements.

**Rationale**: GearsMap's brand identity targets technical professionals in geospatial and AI. Visual noise erodes credibility; precision signals expertise.

### II. Accessibility First

All user-facing features MUST meet WCAG 2.1 Level AA before merge.

- Color contrast MUST be >= 4.5:1 for normal text, >= 3:1 for large text.
- Every interactive element MUST be reachable and operable via keyboard (Tab, Enter, Space, Escape).
- Focus states MUST be visible and distinct from hover states.
- Images MUST have descriptive `alt` text; decorative images MUST use `alt=""`.
- Form inputs MUST have associated `<label>` elements or `aria-label` attributes.
- Semantic HTML MUST be used (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).

**Rationale**: Accessibility is a legal and ethical baseline, not a feature. Non-compliant components block deployment.

### III. Internationalization Integrity

All user-visible text MUST flow through the custom i18n system. External i18n libraries are prohibited.

- Text MUST be accessed via `useLanguage()` hook: `const { t, language } = useLanguage()`.
- Translation strings MUST be defined in `lib/translations.ts` for all three languages: ES (default), EN, FR.
- No hardcoded strings in JSX—not even punctuation that varies by locale.
- New translation keys MUST be added to all three languages simultaneously; partial additions are a build-breaking offense.
- String concatenation for translated text is prohibited; use template keys with interpolation.

**Rationale**: GearsMap operates across Latin America and Europe. Incomplete translations degrade trust with international prospects.

### IV. Performance Budget

Every change MUST preserve or improve Core Web Vitals.

- Largest Contentful Paint (LCP) MUST be < 2.5s on 4G simulation.
- Cumulative Layout Shift (CLS) MUST be < 0.1.
- Heavy components (globe, charts, carousels) MUST use `dynamic()` import with `ssr: false` or `loading` skeletons.
- Images MUST use Next.js `<Image>` component or explicit `loading="lazy"` with defined dimensions.
- Bundle size MUST NOT increase by more than 20KB (gzipped) per feature without documented justification.

**Rationale**: The marketing site's conversion depends on fast first impressions. A slow hero section loses prospects before they scroll.

### V. Component-Driven Architecture

UI MUST be built from composable, reusable components following established library conventions.

- shadcn/ui components are the base layer; customize in `components/ui/`, never fork into separate directories.
- Tailwind classes MUST be merged via `cn()` from `@/lib/utils`—never raw string concatenation.
- Icons: `lucide-react` for general UI, `@icons-pack/react-simple-icons` for brand logos. No other icon libraries.
- New UI primitives MUST be evaluated against existing shadcn/ui components before creation.
- MagicUI and Framer Motion are permitted for animations; inline CSS animations are prohibited.
- `"use client"` directive MUST only appear on components that genuinely require browser APIs or interactivity.

**Rationale**: Consistent component usage prevents fragmentation across a growing codebase and keeps the design system coherent.

### VI. Graceful Degradation

Backend integrations MUST fail safely without breaking the user-facing experience.

- Contact form MUST function even when email provider is unavailable (database save is sufficient).
- API route errors MUST return structured JSON with `status`, `message`, and optional `hint` fields.
- External API proxy failures (GearsmapAPI) MUST NOT crash the page; show user-friendly fallback states.
- Environment variable absence MUST be handled at startup with clear console warnings, not runtime crashes.

**Rationale**: The site is the company's primary digital presence. Downtime from a third-party email or database outage is unacceptable.

## Technology Constraints

- **Framework**: Next.js 16 (App Router). Pages use file-based routing in `app/`.
- **Language**: TypeScript 5 with strict mode. JavaScript files are prohibited.
- **Styling**: Tailwind CSS 4 with OKLCH design tokens. No CSS Modules, no styled-components, no inline styles.
- **State**: React Context for global state (theme, language). No Redux, Zustand, or Jotai.
- **Forms**: React Hook Form + Zod schemas. No Formik, no unvalidated forms.
- **Database**: `@vercel/postgres` (Neon). No ORM layer; raw SQL via the pool client.
- **Email**: React Email templates in `emails/`. Nodemailer or Microsoft Graph for transport.
- **Deployment**: Vercel. Images unoptimized for static export compatibility.
- **Dependencies**: `npm install --legacy-peer-deps` is mandatory due to React 19 peer conflicts.

Adding new dependencies MUST be justified in the PR description. Dependencies over 50KB (gzipped) require explicit performance impact analysis.

## Quality Gates

Every PR MUST satisfy these gates before merge:

1. **Build passes**: `npm run build` completes without errors (TS errors ignored per config, but new type errors SHOULD be fixed).
2. **Lint passes**: `npm run lint` reports zero errors.
3. **i18n complete**: All new text has translations in ES, EN, and FR.
4. **Dark mode verified**: Changed components render correctly in both themes.
5. **Mobile verified**: Changed components render correctly at 375px viewport minimum.
6. **No console errors**: Browser console shows zero errors/warnings from changed code.
7. **Accessibility check**: Changed interactive elements have focus states, ARIA labels, and keyboard operability.

## Governance

This constitution is the highest-authority document for the GearsMap website project. When conflicts arise between this constitution and other guidance (CLAUDE.md, copilot-instructions.md, inline comments), this constitution prevails.

**Amendment procedure**:
1. Propose the change with rationale in a PR description or via `/speckit.constitution`.
2. Amendments MUST include a version bump following semver (MAJOR for principle removal/redefinition, MINOR for additions, PATCH for clarifications).
3. All dependent templates MUST be checked for consistency after amendment.

**Compliance review**:
- Every `/speckit.plan` execution MUST include a Constitution Check gate.
- `/design-review` and `/ui-review` audits MUST verify principles I, II, and III.
- `/perf-check` audits MUST verify principle IV.

**Version**: 1.0.0 | **Ratified**: 2026-03-14 | **Last Amended**: 2026-03-14
