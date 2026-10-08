# Research: Design Review Fixes

**Branch**: `001-design-review-fixes` | **Date**: 2026-03-14

## R1: Globe Theme Reactivity

**Decision**: Pass `resolvedTheme` from `useTheme()` (next-themes) into the Globe component as a `dark` prop. Set `dark: resolvedTheme === 'dark' ? 1 : 0` in the Cobe config.

**Rationale**: The Cobe library's `createGlobe()` accepts a `dark` parameter (0 = light, 1 = dark) that controls globe surface shading, glow, and atmosphere. The `useTheme()` hook from next-themes provides `resolvedTheme` which always resolves to `"light"` or `"dark"` (never `"system"`). The Globe component already re-creates the globe instance on config changes via a `useEffect`, so passing a reactive `dark` prop will naturally trigger a re-render.

**Alternatives considered**:
- CSS filter inversion on the canvas — rejected: distorts colors, doesn't match Cobe's native light mode rendering.
- Separate Globe instances for light/dark — rejected: wasteful of WebGL context, unnecessary complexity.

## R2: Service Card Keyboard Accessibility

**Decision**: Change the inner element of `DialogTrigger asChild` from `<div>` to `<button>` with `className="glass-card text-left w-full"`. This gives native keyboard focus, Enter/Space activation, and screen reader announcements without custom ARIA.

**Rationale**: Radix UI's `DialogTrigger asChild` merges its props into the child element. When the child is a `<div>`, it receives `tabindex="-1"` (not focusable via Tab). When it's a `<button>`, it's natively focusable and activatable. This is the simplest path to WCAG 2.1 SC 2.1.1 compliance.

**Alternatives considered**:
- Add `role="button" tabIndex={0} onKeyDown` to the div — rejected: reinvents native button behavior, more code, more failure modes.
- Wrap card in a separate `<button>` outside DialogTrigger — rejected: creates nested interactive elements.

## R3: i18n Missing Strings

**Decision**: Add all missing strings to `lib/translations.ts` under new keys for all three languages (ES, EN, FR). Strings to add:

1. **Toast messages**: `t.contact.toast.success`, `t.contact.toast.error`, `t.contact.toast.validationError`, `t.contact.toast.successDescription`, `t.contact.toast.errorDescription`
2. **Button loading**: `t.contact.sending`
3. **Team roles**: `t.team.members[i].role` (4 roles)
4. **Project status**: `t.projects.status.inDevelopment`
5. **Hero floating card values**: `t.hero.floating.revenueValue`, `t.hero.floating.insightsValue`, `t.hero.floating.dataValue`

**Rationale**: The constitution (Principle III) explicitly prohibits hardcoded strings in JSX. All three languages must be added simultaneously.

**Alternatives considered**:
- Use a fallback mechanism for untranslated strings — rejected: masks the problem, violates constitution.

## R4: OKLCH Token Consistency

**Decision**: Convert `--accent: #2EB1C3` to `--accent: oklch(0.69 0.11 200)` in both light and dark theme blocks in `globals.css`. Also convert `--ring` and `--chart-1` which use the same hex value.

**Rationale**: Constitution Principle I mandates "Color tokens MUST come from the OKLCH palette defined in globals.css; no hex/rgb literals in components." The accent token is the only remaining hex value in the token system.

**Alternatives considered**:
- Keep hex and add an OKLCH comment — rejected: doesn't fix the inconsistency, tooling can't interpolate hex in an OKLCH context.

## R5: z-index Strategy

**Decision**: Change the noise overlay `body::before` from `z-index: 50` to `z-index: 9999`. Since the overlay has `pointer-events: none` and very low opacity (0.03), placing it at the top of the stacking order is safe and prevents conflicts with the header's `z-50`.

**Rationale**: The overlay is purely decorative and non-interactive. Putting it at a very high z-index removes all stacking conflicts while keeping the visual effect.

**Alternatives considered**:
- Lower the overlay to `z-index: 10` — rejected: places it behind modal overlays where the noise texture should still be visible.
- Use `isolation: isolate` on the header — rejected: more complex, may break fixed positioning.

## R6: Image Console Warnings

**Decision**: Add `style={{ width: 'auto' }}` to the `<Image>` components in header and footer alongside the existing `className="h-8 w-auto"`. This satisfies Next.js's internal dimension validation while preserving the CSS-driven sizing.

**Rationale**: Next.js Image component warns when CSS overrides only one dimension. Adding the inline `style` prop makes the override explicit and suppresses the warning.

**Alternatives considered**:
- Remove the `width` prop entirely — rejected: Next.js Image requires it for static optimization.
- Use `fill` layout mode — rejected: requires a positioned container, changes the component structure.
