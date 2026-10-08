# Tasks: Design Review Fixes

**Input**: Design documents from `/specs/001-design-review-fixes/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not requested — manual verification only per quickstart.md.

**Organization**: Tasks grouped by user story for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: No project initialization needed — all files already exist. Skip to Phase 2.

---

## Phase 2: Foundational (Translation Keys)

**Purpose**: Add all missing translation keys to `lib/translations.ts` — this is a prerequisite for US3 and US4, but doing it first prevents merge conflicts since multiple stories reference the same file.

- [x] T001 Add contact toast translation keys (sending, success, successDescription, error, errorDescription, validationError) for ES/EN/FR in `lib/translations.ts`
- [x] T002 Add team role translation keys (ceo, cpo, cdo, cco) for ES/EN/FR in `lib/translations.ts`
- [x] T003 Add project status translation key (inDevelopment) for ES/EN/FR in `lib/translations.ts`
- [x] T004 Add hero floating card value translation keys (revenueValue, insightsValue, dataValue) for ES/EN/FR in `lib/translations.ts`
- [x] T005 Fix typo: change "Contactenos" to "Contáctenos" in ES contact header in `lib/translations.ts`

**Checkpoint**: All translation keys exist in all 3 languages. No implementation references yet.

---

## Phase 3: User Story 1 — Globe Visibility in Light Mode (Priority: P1) 🎯 MVP

**Goal**: Globe renders with appropriate contrast in both light and dark themes, adapting reactively to theme changes.

**Independent Test**: Toggle light/dark mode — globe should be clearly visible in both.

### Implementation for User Story 1

- [x] T006 [US1] Add `dark` prop to Globe component interface and pass it to Cobe config in `components/ui/globe.tsx`
- [x] T007 [US1][US6] Add `aria-hidden="true"` to the globe canvas element in `components/ui/globe.tsx` (covers FR-011 from US6)
- [x] T008 [US1] Pass `resolvedTheme` from `useTheme()` as `dark` prop to Globe in `app/page.tsx` hero section

**Checkpoint**: Globe visible in both themes, canvas hidden from screen readers.

---

## Phase 4: User Story 2 — Keyboard-Accessible Service Cards (Priority: P1)

**Goal**: All 6 service cards are reachable and activatable via keyboard with visible focus indicators.

**Independent Test**: Tab through services section — all cards focusable, Enter/Space opens dialog, Escape closes and returns focus.

### Implementation for User Story 2

- [x] T009 [US2] Change service card inner element from `<div>` to `<button>` inside `DialogTrigger asChild` in `app/page.tsx` services section. Verify that closing the dialog (Escape or close button) returns focus to the triggering button (FR-003).
- [x] T010 [US2] Add visible focus styles (focus-visible ring) to the service card button via `cn()` in `app/page.tsx`

**Checkpoint**: Keyboard walkthrough of all 6 service cards works correctly. Focus returns to card after dialog close.

---

## Phase 5: User Story 3 — Complete i18n Coverage (Priority: P2)

**Goal**: All user-visible strings source from translation system — zero hardcoded English strings when non-English language is active.

**Independent Test**: Switch to FR, scroll entire page, trigger contact form toasts — all strings in French.

### Implementation for User Story 3

- [x] T011 [US3] Replace hardcoded toast messages (success/error/validation) with `t.contact.toast.*` in `app/page.tsx` contact form handler
- [x] T012 [US3] Replace hardcoded "Sending..." with `t.contact.sending` in `app/page.tsx` submit button
- [x] T013 [US3] Replace hardcoded team member role strings with `t.team.roles.*` in `app/page.tsx` team section
- [x] T014 [US3] Replace hardcoded "In Development" with `t.projects.status.inDevelopment` in `app/page.tsx` project cards
- [x] T015 [US3] Replace hardcoded hero floating card value strings with `t.hero.floating.*Value` in `app/page.tsx` hero section

**Checkpoint**: All visible strings display in selected language across ES/EN/FR.

---

## Phase 6: User Story 4 — Typo and Text Correctness (Priority: P2)

**Goal**: Contact section heading displays "Contáctenos" with correct accent in Spanish.

**Independent Test**: Load site in ES — contact heading shows correct accent.

### Implementation for User Story 4

- [x] T016 [US4] Update contact section heading in `app/page.tsx` to reference `t.contact.header` (key fixed in T005). If already using the key, confirm the rendered output shows "Contáctenos" in ES.

**Checkpoint**: "Contáctenos" displays correctly in ES mode.

---

## Phase 7: User Story 5 — Visual Polish and Theme Consistency (Priority: P3)

**Goal**: Consistent OKLCH tokens, theme-aware colors, correct z-index stacking, no console warnings.

**Independent Test**: Inspect CSS vars, toggle dark mode, check browser console — zero warnings.

### Implementation for User Story 5

- [x] T017 [US5] Convert `--accent`, `--ring`, and `--chart-1` from hex `#2EB1C3` to `oklch(0.69 0.11 200)` in both light and dark theme blocks in `app/globals.css`
- [x] T018 [US5] Change noise overlay `body::before` z-index from 50 to 9999 in `app/globals.css`
- [x] T019 [US5] Change `text-white` to `text-accent-foreground` on dialog CTA button in `app/page.tsx`

**Checkpoint**: All tokens OKLCH, correct z-index stacking, theme-aware dialog button.

> **Note**: FR-010 (Image console warnings) removed from scope — fixing it requires inline `style` prop which violates the constitution's "no inline styles" constraint. The warning is cosmetic and does not affect functionality.

---

## Phase 8: User Story 6 — Accessibility Decorative Elements (Priority: P3)

**Goal**: Decorative elements hidden from assistive tech, no duplicate CSS.

**Independent Test**: Screen reader skips globe, no duplicate declarations in stylesheet.

### Implementation for User Story 6

- [x] T023 [P] [US6] Remove duplicate `scroll-behavior: smooth` declaration (keep one, remove the other at ~line 282) in `app/globals.css`

**Checkpoint**: Globe `aria-hidden` (done in T007), no duplicate CSS props.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final validation across all stories.

- [x] T020 Run `npm run build` and verify zero errors
- [x] T021 Run `npm run lint` and verify zero errors
- [x] T022 Run quickstart.md verification checklist (globe, keyboard, i18n, console, build) including mobile viewport check at 375px (Constitution Quality Gate 5)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 2 (Foundational)**: No dependencies — can start immediately
- **Phase 3 (US1 Globe)**: Independent — can start immediately (different files from Phase 2)
- **Phase 4 (US2 Keyboard)**: Independent — can start immediately
- **Phase 5 (US3 i18n)**: Depends on Phase 2 (translation keys must exist before referencing)
- **Phase 6 (US4 Typo)**: Depends on T005 from Phase 2
- **Phase 7 (US5 Visual)**: Independent — can start immediately
- **Phase 8 (US6 A11y)**: Independent — can start immediately (T007 is in Phase 3)
- **Phase 9 (Polish)**: Depends on ALL previous phases

### User Story Dependencies

- **US1 (Globe)**: Independent — touches `globe.tsx` and globe section of `page.tsx`
- **US2 (Keyboard)**: Independent — touches service card section of `page.tsx`
- **US3 (i18n)**: Depends on Phase 2 (T001-T005) — touches multiple sections of `page.tsx`
- **US4 (Typo)**: Depends on T005 — minimal page.tsx change
- **US5 (Visual)**: Independent — touches `globals.css` and dialog section of `page.tsx`
- **US6 (A11y)**: Partially depends on US1 (T007) — touches `globals.css`

### File Contention Warning

`app/page.tsx` is touched by US1, US2, US3, US4, US5. These MUST be executed sequentially (not in parallel) to avoid merge conflicts. Recommended order: US1 → US2 → US5 (T019) → then after Phase 2: US3 → US4.

`app/globals.css` is touched by US5 (T017, T018) and US6 (T023). Execute T017 → T018 → T023 sequentially within the file.

### Parallel Opportunities

- **Phase 2 (translations.ts) + Phase 3 (globe.tsx)**: Safe — different files
- **T006 + T007**: Both in `globe.tsx` but different sections, can be done together
- **T023 [P]**: Can run in parallel with any `page.tsx` task (different file)

---

## Execution Order (Recommended Sequential)

```text
# Step 1: Foundation + Globe (parallel — different files)
T001-T005: Translation keys in lib/translations.ts
T006-T007: Globe dark prop + aria-hidden in components/ui/globe.tsx

# Step 2: page.tsx edits (sequential — same file)
T008: Pass theme to Globe in page.tsx
T009-T010: Service card keyboard fix in page.tsx
T019: Dialog CTA text-accent-foreground in page.tsx
T011-T015: i18n string replacements in page.tsx (needs T001-T005)
T016: Contact heading reference in page.tsx

# Step 3: globals.css edits (sequential — same file)
T017: OKLCH token conversion in globals.css
T018: z-index fix in globals.css
T023: Duplicate scroll-behavior removal in globals.css

# Step 4: Verification
T020-T022: Build, lint, verification + mobile 375px check
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T006-T008 (Globe theme fix)
2. **STOP and VALIDATE**: Toggle light/dark — globe visible in both
3. This alone delivers the highest-impact visual fix

### Incremental Delivery

1. US1 (Globe) → Visual impact for 50% of visitors
2. US2 (Keyboard) → WCAG compliance for services section
3. Phase 2 + US3 (i18n) → Complete multilingual experience
4. US4 (Typo) → "Contáctenos" accent fix
5. US5 (Visual) → Design token consistency
6. US6 (A11y) → Cleanup
7. Polish → Build verification

---

## Notes

- All changes are in existing files — no new files created
- `page.tsx` is touched by US1, US2, US3, US4, US5 — execute these sequentially, NOT in parallel
- `globals.css` is touched by US5 (T017, T018) and US6 (T023) — execute sequentially
- `translations.ts` is only touched in Phase 2 — single-writer, no conflicts
- FR-010 (Image console warnings) removed from scope — constitution prohibits inline styles
- Total: 23 tasks across 9 phases
