# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16.4 App Router website written in TypeScript and React 19.3. Route pages, localized layouts, metadata files and API handlers live in `app/`. The root layout is `app/[locale]/layout.tsx` (there is no `app/layout.tsx`), the home page is `app/[locale]/page.tsx`, and the contact endpoint is `app/api/contact/route.ts`. Reusable site components are in `components/`, and small shadcn-style primitives belong in `components/ui/` (no Radix dropdown or toast; menus use the native `popover` attribute). Keep hooks in `hooks/`, shared helpers in `lib/`, email templates in `emails/`, global styles in `app/globals.css`, and static assets in `public/`.

Copy lives in typed content files: `lib/translations.ts` (shared UI strings), `lib/project-content.ts` (projects and case studies), `lib/team-content.ts` (founders), `lib/services.ts` (service pages) and `lib/climate.ts` (MRV and M&E pages). Owner-only facts are typed `T | null` and render nothing while null; never invent metrics, clients, dates or bios.

## Build, Test, and Development Commands

- `npm install` installs dependencies (no `--legacy-peer-deps` needed). In a fresh checkout, run `npx next typegen` once so `npm run typecheck` finds `next-env.d.ts` and the generated route types.
- `npm run dev` starts the local server at `http://localhost:3000`.
- `npm run lint` runs ESLint across the repository.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run test:e2e` builds with `EXPOSE_TESTING_API=1`, serves the build with `next start` on port 3100, and runs the Playwright and axe tests against it.
- `npm run build` creates the production build; run it before handing off a change.
- `npm run start` serves an existing production build.

## Coding Style & Naming Conventions

Use TypeScript with strict types and the `@/*` import alias. Follow the existing style: two-space indentation, double quotes, semicolon-free statements, and PascalCase React component names (for example, `LanguageSwitcher`). Use kebab-case filenames such as `language-switcher.tsx`; route files retain Next.js names like `page.tsx` and `route.ts`. Prefer Tailwind utility classes and merge conditional classes with `cn()` from `@/lib/utils`. Use `lucide-react` for general icons and preserve the custom dictionary-based i18n system (no i18n libraries): add user-facing copy to all ES, EN, and FR entries of the relevant content file. Slugs stay Spanish in every locale. Theme switching is native (`lib/theme-script.ts`, `lib/theme.ts`); do not add next-themes back.

## Testing & Validation

For every change, run `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:e2e`. CI runs the same checks on every pull request (`.github/workflows/ci.yml`). For responsive/UI work, also run `npm run review:visual` against a production server and inspect the generated screenshots. Manually check affected routes, responsive states, dark mode, reduced motion, and translated content. For contact-form work, validate invalid inputs and the graceful behavior when database or email environment variables are absent.

## Commits & Pull Requests

Git history is not available in this checkout, so no repository-specific message pattern can be verified. Use concise imperative Conventional Commit-style subjects, e.g. `fix: validate contact email`. Keep commits focused. Pull requests should describe the user-visible change, link the issue or specification when applicable, list validation commands, and include screenshots for UI changes.

## Security & Configuration

Never commit credentials or `.env` files. Contact processing can use Postgres plus SMTP or Microsoft Graph; the full environment-variable table is in `CLAUDE.md`. Document new environment variables there and keep server-only secrets out of client components.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
