<div align="center">
  <img src="public/images/gearsmap-logo.png" alt="GearsMap Logo" width="280" height="auto" />

  <h1 align="center">GearsMap Website</h1>

  <p align="center">
    <strong>The official digital presence and platform for GearsMap S.A.S.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.3-blue?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/License-Proprietary-red?style=flat-square" alt="License" />
  </p>
</div>

<br />

## 📖 About The Project

This repository contains the source code for the **GearsMap S.A.S.** official website. It is a modern, high-performance web application built to showcase our services, solutions, and company information.

The platform is engineered for performance, accessibility, and scalability, leveraging the latest advancements in the React ecosystem.

## ✨ Key Features

- **⚡ High Performance:** Built on **Next.js 16.4** with App Router, Server Components, Cache Components and Partial Prefetching.
- **🎨 Distinctive UI/UX:** A territory-to-data visual language with Sora, Manrope, geospatial layers and a deferred Cobe globe.
- **🌙 Dark Mode:** Native theming: an inline script applies the saved theme before first paint (`lib/theme-script.ts`), and `lib/theme.ts` switches it with the View Transitions API.
- **📊 Data Visualization:** A deferred **Cobe** globe, skipped on data-saver, low-memory and phone-sized devices.
- **📝 Robust Forms:** Accessible contact form with **Zod** validation, project/demo intent routing, spam guards and a localized confirmation email.
- **✨ Animations:** CSS micro-interactions and React 19.3 `<ViewTransition>` morphs, all with reduced-motion support.
- **📱 Responsive:** Mobile-first design ensuring compatibility across all devices.

---

## 🛠️ Technology Stack

### Core
- **Framework:** [Next.js 16](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

### Styling & UI
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)-style primitives; native `popover` menus (no Radix dropdown or toast)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** CSS microinteractions and React `<ViewTransition>`, with reduced-motion support
- **Globe:** [Cobe](https://cobe.vercel.app/)

### State & Logic
- **Validation:** [Zod](https://zod.dev/)
- **Utilities:** [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Data & email:** [@vercel/postgres](https://vercel.com/docs/storage/vercel-postgres) (Neon), [Nodemailer](https://nodemailer.com/), Microsoft Graph, [React Email](https://react.email/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v20.9 or higher)
- **npm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MLeonardoMP/gearsmapwebsite.git
   cd gearsmapwebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   npx next typegen   # generates next-env.d.ts and route types for typecheck
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

The public site is available in Spanish, English and French at `/es`, `/en` and `/fr`. The root path redirects to `/es`. Slugs are Spanish in every locale.

The contact form needs a database and/or email provider; see the environment-variable table in [`CLAUDE.md`](CLAUDE.md). Without them the form still validates, and the API reports which delivery method is missing.

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with hot-reloading. |
| `npm run build` | Compiles the application for production deployment. |
| `npm run start` | Runs the built production application. |
| `npm run lint` | Checks the codebase for linting errors. |
| `npm run typecheck` | Runs TypeScript without emitting files. |
| `npm run test:e2e` | Builds for production, serves it on port 3100 and runs the Playwright route, interaction and axe tests. |
| `npm run review:visual` | Captures responsive visual evidence and performance metrics. |
| `npm audit` | Checks dependency vulnerabilities. |

---

## 📂 Project Structure

```text
├── app/[locale]/       # Root layout and localized routes (home, proyectos, servicios, sistemas-climaticos, legal)
├── app/api/contact/    # Contact form API
├── components/home/    # Server-rendered landing sections and interactive islands
├── components/         # Header, footer and other reusable UI components
├── emails/             # React Email templates (admin notification, localized confirmation)
├── hooks/              # Custom React hooks
├── lib/                # Content files (translations, project-content, team-content, services, climate), SEO and theme helpers
├── public/             # Static assets (images, fonts, icons)
├── docs/               # Current plan, skill catalog and performance reference
└── ...config files
```

---

## 🔒 License

**PROPRIETARY & CONFIDENTIAL**

Copyright © 2026 **GEARSMAP S.A.S.** All Rights Reserved.

This software is the confidential and proprietary information of GEARSMAP S.A.S. ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with GEARSMAP S.A.S.

**Unauthorized copying of this file, via any medium is strictly prohibited.**

For licensing inquiries, please contact us directly.

---

<div align="center">
  <p>Built with ❤️ by the <strong>GearsMap Engineering Team</strong></p>
</div>
