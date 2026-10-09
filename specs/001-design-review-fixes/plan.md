# Implementation Plan: Design Review Fixes

**Branch**: `001-design-review-fixes` | **Date**: 2026-03-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-design-review-fixes/spec.md`

## Summary

Fix 10 design review findings across accessibility, i18n, theme consistency, and visual polish. The two P1 items are globe light-mode visibility and keyboard-accessible service cards. P2 covers i18n completion and typo fixes. P3 addresses design token consistency, z-index stacking, and decorative element accessibility.

## Technical Context

**Language/Version**: TypeScript 5 / React 19
**Primary Dependencies**: Next.js 16 (App Router), Tailwind CSS 4, Cobe (3D globe), Framer Motion, Radix UI, next-themes, shadcn/ui
**Storage**: N/A (no data model changes)
**Testing**: Manual verification (visual inspection, keyboard walkthrough, i18n audit, console check)
**Target Platform**: Web (Vercel deployment), all modern browsers
**Project Type**: Marketing website (single-page with anchor navigation)
**Performance Goals**: LCP < 2.5s, CLS < 0.1 (no new dependencies, no bundle size increase)
**Constraints**: No external i18n libraries, OKLCH-only design tokens, `cn()` for class merging
**Scale/Scope**: 4 files modified, ~16 new translation keys, 0 new dependencies

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Minimalist Aesthetic | PASS | No new visual elements; fixes align existing tokens to OKLCH. Animations unchanged. |
| II. Accessibility First | PASS | This feature directly addresses WCAG 2.1 SC 2.1.1 (keyboard) and decorative element marking. |
| III. Internationalization Integrity | PASS | Adds ~16 missing translation keys across ES/EN/FR simultaneously. Fixes "Contactenos" typo. |
| IV. Performance Budget | PASS | Zero new dependencies. No bundle size increase. Globe re-render on theme change is negligible. |
| V. Component-Driven Architecture | PASS | Uses existing shadcn/ui patterns. `cn()` for class merging. No new icon libraries. |
| VI. Graceful Degradation | PASS | No backend changes. Globe falls back to current behavior if theme hook is unavailable. |

**Technology Constraints check**:
- No new dependencies added
- TypeScript only
- Tailwind CSS via `cn()` utility
- OKLCH design tokens

**Quality Gates alignment**:
- Build: Will verify with `npm run build`
- i18n: All new keys added to ES, EN, FR simultaneously
- Dark mode: Globe fix directly addresses dark mode parity
- Mobile: No layout changes (tablet hero is P3, not in scope)
- Console: Image warning fix + duplicate CSS removal
- Accessibility: Service card keyboard fix + globe `aria-hidden`

**Post-Phase 1 Re-check**: PASS — No new technology introduced, no complexity violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-design-review-fixes/
├── plan.md              # This file
├── research.md          # Phase 0 output — research decisions
├── data-model.md        # Phase 1 output — translation keys & token changes
├── quickstart.md        # Phase 1 output — setup & verification guide
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── globals.css          # OKLCH token fix, z-index fix, duplicate removal
└── page.tsx             # Globe theme prop, service card <button>, i18n strings, text-accent-foreground

components/
└── ui/
    └── globe.tsx        # Accept dark prop, add aria-hidden to canvas

lib/
└── translations.ts      # ~16 new keys (ES/EN/FR), "Contáctenos" typo fix
```

**Structure Decision**: All changes are in existing files. No new files, directories, or dependencies.

## Complexity Tracking

No constitution violations. Table intentionally left empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
