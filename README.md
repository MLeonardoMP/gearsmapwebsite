<div align="center">
  <img src="public/images/gearsmap-logo.png" alt="GearsMap Logo" width="280" height="auto" />

  <h1 align="center">GearsMap Website</h1>

  <p align="center">
    <strong>The official digital presence and platform for GearsMap S.A.S.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/License-Proprietary-red?style=flat-square" alt="License" />
  </p>
</div>

<br />

## 📖 About The Project

This repository contains the source code for the **GearsMap S.A.S.** official website. It is a modern, high-performance web application built to showcase our services, solutions, and company information.

The platform is engineered for performance, accessibility, and scalability, leveraging the latest advancements in the React ecosystem.

## ✨ Key Features

- **⚡ High Performance:** Built on **Next.js 16.3.3** with App Router, Server Components, Cache Components and Partial Prefetching.
- **🎨 Distinctive UI/UX:** A territory-to-data visual language with Sora, Manrope, geospatial layers and a deferred Cobe globe.
- **🌙 Dark Mode:** Fully supported theming via `next-themes`.
- **📊 Data Visualization:** Geospatial experiences powered by **Cobe** and modern web tooling.
- **📝 Robust Forms:** Accessible contact forms with client-side feedback, **Zod** validation and project/demo intent routing.
- **✨ Animations:** Smooth transitions and micro-interactions powered by `tailwindcss-animate`.
- **📱 Responsive:** Mobile-first design ensuring compatibility across all devices.

---

## 🛠️ Technology Stack

### Core
- **Framework:** [Next.js 16](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

### Styling & UI
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** CSS microinteractions with reduced-motion support

### State & Logic
- **Validation:** [Zod](https://zod.dev/)
- **Utilities:** [date-fns](https://date-fns.org/), [clsx](https://github.com/lukeed/clsx)

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
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

The public site is available in Spanish, English and French at `/es`, `/en` and `/fr`. The root path redirects to `/es`.

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with hot-reloading. |
| `npm run build` | Compiles the application for production deployment. |
| `npm run start` | Runs the built production application. |
| `npm run lint` | Checks the codebase for linting errors. |
| `npm run typecheck` | Runs TypeScript without emitting files. |
| `npm run test:e2e` | Runs Playwright route, interaction and axe tests. |
| `npm run review:visual` | Captures responsive visual evidence and performance metrics. |
| `npm audit` | Checks dependency vulnerabilities. |

---

## 📂 Project Structure

```text
├── app/                # Next.js App Router pages, localized routes and API handlers
├── components/home/    # Server-rendered landing sections and interactive islands
├── components/         # Reusable UI components (atoms, molecules, organisms)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions, constants, and configurations
├── public/             # Static assets (images, fonts, icons)
├── docs/               # Current plan, skill catalog and performance reference
└── ...config files
```

---

## 🔒 License

**PROPRIETARY & CONFIDENTIAL**

Copyright © 2025 **GEARSMAP S.A.S.** All Rights Reserved.

This software is the confidential and proprietary information of GEARSMAP S.A.S. ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with GEARSMAP S.A.S.

**Unauthorized copying of this file, via any medium is strictly prohibited.**

For licensing inquiries, please contact us directly.

---

<div align="center">
  <p>Built with ❤️ by the <strong>GearsMap Engineering Team</strong></p>
</div>
