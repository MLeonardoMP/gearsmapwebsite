# Quickstart: Design Review Fixes

**Branch**: `001-design-review-fixes` | **Date**: 2026-03-14

## Prerequisites

- Node.js 18+
- pnpm (or npm with `--legacy-peer-deps`)

## Setup

```bash
git checkout 001-design-review-fixes
npm install --legacy-peer-deps
npm run dev
```

## Files to Modify

| File | Changes |
|------|---------|
| `components/ui/globe.tsx` | Accept `dark` prop, remove hardcoded value |
| `app/page.tsx` | Pass theme to globe, change card `<div>` to `<button>`, replace hardcoded strings with `t.*`, fix `text-white` to `text-accent-foreground` |
| `lib/translations.ts` | Add ~16 new translation keys across ES/EN/FR, fix "Contactenos" → "Contáctenos" |
| `app/globals.css` | Convert hex tokens to OKLCH, fix z-index on `body::before`, remove duplicate `scroll-behavior` |
| `components/header.tsx` | Add `style={{ width: 'auto' }}` to Image |
| `components/footer.tsx` | Add `style={{ width: 'auto' }}` to Image |

## Verification

1. **Globe**: Toggle light/dark mode — globe should be visible in both
2. **Keyboard**: Tab through service cards — all 6 should receive focus and open dialog on Enter
3. **i18n**: Switch to FR/EN — all strings should translate (toasts, roles, badges, floating cards)
4. **Console**: Open DevTools — zero warnings/errors
5. **Build**: `npm run build` should pass
