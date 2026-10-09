---
name: frontend-architect
description: Expert frontend engineering skill for Next.js 16, Tailwind CSS, Shadcn/UI, and MagicUI.
---

# Frontend Architect Skill

This skill equips GitHub Copilot with high-level patterns for building modern web applications using the latest standards.

## Core Principles
- **Component-First:** Build modular, reusable components using Atomic Design.
- **Type Safety:** Strict TypeScript usage for all props and state.
- **Performance:** Optimize for Core Web Vitals, use Next.js Image, and minimize client-side JS.
- **Accessibility:** Ensure all components follow WAI-ARIA guidelines and are keyboard navigable.

## Tech Stack Guidelines
- **Next.js 16:** 
  - Use App Router and React Server Components (RSC) by default.
  - Use `use client` only for interactivity or browser-only APIs.
  - Leverage Next.js 16 features like improved caching and streaming.
  - Reference: `/vercel/next.js/v16.1.0`
- **Tailwind CSS:** 
  - Use utility classes exclusively.
  - Avoid arbitrary values; use the design system's spacing and color tokens.
  - Follow mobile-first responsiveness.
- **Shadcn/UI:** 
  - Use as the base component library.
  - Install components via CLI and customize them in `@/components/ui`.
  - Use the `cn()` utility for conditional class merging.
  - Reference: `/websites/ui_shadcn`
- **MagicUI:** 
  - Use for complex animations, Bento Grids, and high-end marketing elements.
  - Ensure animations are performant and don't cause layout shifts.
  - Reference: `/magicuidesign/magicui`

## Workflow
1. **Scaffold:** Create the component structure with proper TypeScript interfaces.
2. **Style:** Apply Tailwind classes following the Shadcn theme.
3. **Animate:** Add MagicUI or Framer Motion effects for polish.
4. **Review:** Check for accessibility (a11y) and performance bottlenecks.

## Examples
- "Scaffold a responsive bento grid using MagicUI and Shadcn."
- "Refactor this client component into a server component with a loading skeleton."
- "Create a high-performance landing page hero section with MagicUI animations."
