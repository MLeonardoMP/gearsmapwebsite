# Workflow UI/UX — GearsMap Website

Flujo de trabajo para mejoras de UI/UX usando Claude Code con agents, skills, y spec-kit.

## Requisitos previos

```bash
npm run dev   # Dev server corriendo en localhost:3000
```

## Herramientas disponibles

### Slash commands (invocar con /)

| Comando | Descripción |
|---------|-------------|
| `/ui-review <archivo>` | Review estético: minimalismo, dark mode, responsive, a11y, i18n |
| `/design-review` | Review visual completo con Playwright (screenshots en 3 viewports) |
| `/perf-check <archivo>` | Analisis de performance: bundle, re-renders, Core Web Vitals |
| `/i18n-check` | Auditoria de traducciones ES/EN/FR |
| `/pr-review` | Review multi-perspectiva de PR (producto, dev, QA, security, UI/UX) |
| `/simplify` | (built-in) Review de codigo por calidad y eficiencia |
| `/todo <accion>` | Gestion de tareas del proyecto |

### Spec-kit commands (desarrollo spec-driven)

| Comando | Descripcion |
|---------|-------------|
| `/speckit.constitution` | Definir principios del proyecto |
| `/speckit.specify <feature>` | Escribir specs de features en lenguaje natural |
| `/speckit.clarify` | Resolver ambiguedades en specs |
| `/speckit.plan` | Planificar arquitectura tecnica |
| `/speckit.tasks` | Generar tareas de implementacion ordenadas |
| `/speckit.implement` | Ejecutar implementacion por fases |
| `/speckit.analyze` | Analisis de consistencia cross-artifact |
| `/speckit.checklist` | Generar checklists de calidad |

### Agents (se invocan automaticamente segun contexto)

| Agente | Proposito |
|--------|-----------|
| ui-designer | Diseno visual, minimalismo, design systems |
| ux-researcher | Investigacion UX, usabilidad, flujos |
| design-review | Review visual con Playwright |
| react-specialist | React 19, hooks, performance |
| nextjs-developer | App Router, SSR, Core Web Vitals |
| accessibility-tester | WCAG 2.1 AA, keyboard, contraste |
| performance-engineer | Optimizacion, bottlenecks |
| code-reviewer | Review de calidad y seguridad |
| seo-specialist | SEO tecnico, meta tags |

### Skills de skills.sh (contexto automatico)

Las skills se cargan como conocimiento procesal. Las mas relevantes:

- **frontend-design** (Anthropic) — patrones de diseno frontend
- **web-design-guidelines** (Vercel) — 100+ reglas de a11y, performance, UX
- **vercel-react-best-practices** (Vercel) — 40+ reglas de React/Next.js
- **tailwind-design-system** — sistema de diseno con Tailwind
- **ui-ux-pro-max** — patrones avanzados de UI/UX
- **nextjs-app-router-patterns** — patrones de App Router
- **next-best-practices** — mejores practicas Next.js
- **accessibility-compliance** — cumplimiento de accesibilidad
- **wcag-audit-patterns** — auditorias WCAG
- **visual-design-foundations** — fundamentos de diseno visual
- **responsive-design** — patrones responsive
- **design-system-patterns** — patrones de design system

---

## Flujo 1: Auditoria inicial (punto de partida)

Usar cuando arrancas a trabajar en UI/UX por primera vez o despues de muchos cambios acumulados.

```
# 1. Arrancar dev server
npm run dev

# 2. Auditoria visual completa con Playwright
/design-review

# 3. El reporte genera:
#    - Screenshots en desktop (1440px), tablet (768px), mobile (375px)
#    - Issues categorizados: Blocker > High > Medium > Nitpick
#    - Checks de dark mode, a11y, keyboard nav, consola

# 4. Review por componente (de los issues encontrados)
/ui-review app/page.tsx
/ui-review components/header.tsx
/ui-review components/footer.tsx

# 5. Performance
/perf-check app/page.tsx

# 6. Traducciones
/i18n-check
```

## Flujo 2: Mejora puntual de componente

Usar cuando quieres mejorar un componente especifico.

```
# 1. Review estetico del componente
/ui-review components/header.tsx

# 2. Claude aplica fixes automaticamente:
#    - Mejora spacing, tipografia, dark mode
#    - Agrega focus states, ARIA labels
#    - Optimiza clases Tailwind con cn()
#    - Verifica i18n

# 3. Verificar con simplify
/simplify

# 4. Verificar performance si aplica
/perf-check components/header.tsx
```

## Flujo 3: Feature nueva (spec-driven con spec-kit)

Usar para features grandes como nuevas secciones, redisenos, o funcionalidades.

```
# 1. Definir la feature en lenguaje natural
/speckit.specify Redisenar la seccion hero con animacion
  minimalista, gradientes sutiles OKLCH, CTA mas prominente,
  y parallax sutil en el globe 3D

# 2. (Opcional) Resolver ambiguedades
/speckit.clarify

# 3. Crear plan tecnico
/speckit.plan

# 4. Generar tareas ordenadas
/speckit.tasks

# 5. Verificar consistencia
/speckit.analyze

# 6. Implementar fase por fase
/speckit.implement

# 7. Review final
/design-review
/simplify
```

## Flujo 4: Pre-merge (antes de crear PR)

```
# 1. Review de codigo
/simplify

# 2. Review visual
/design-review

# 3. Verificar traducciones
/i18n-check

# 4. Crear PR con review completo
/pr-review
```

---

## Principios de diseno GearsMap

### Estetica
- **Minimalismo**: whitespace generoso, layouts limpios, sin ruido visual
- **Tipografia**: Manrope como fuente principal, jerarquia clara
- **Colores**: OKLCH design tokens definidos en `app/globals.css`
- **Dark mode**: soporte completo via next-themes, ambos modos deben verse bien
- **Animaciones**: sutiles y con proposito (framer-motion, tailwindcss-animate, MagicUI)

### Tecnico
- **Mobile-first**: responsive con breakpoints sm/md/lg/xl
- **Component library**: shadcn/ui + Radix UI + MagicUI
- **Class merging**: siempre usar `cn()` de `@/lib/utils`
- **Icons**: lucide-react (general), @icons-pack/react-simple-icons (brands)
- **i18n**: `useLanguage()` hook, NO librerias externas. Strings en `lib/translations.ts`

### Accesibilidad
- WCAG 2.1 AA minimo
- Contraste 4.5:1
- Keyboard navigation completa
- Focus states visibles
- ARIA labels en elementos interactivos
- Semantic HTML

---

## Estructura spec-kit

```
.specify/
  init-options.json          # Configuracion del proyecto
  memory/
    constitution.md          # Principios del proyecto (crear con /speckit.constitution)
  templates/
    constitution-template.md # Template para constitution
    spec-template.md         # Template para specs
    plan-template.md         # Template para planes
    tasks-template.md        # Template para tareas
    checklist-template.md    # Template para checklists
    agent-file-template.md   # Template para agentes
  scripts/
    bash/                    # Scripts para Linux/Mac/Git Bash
    powershell/              # Scripts para Windows PowerShell
```

Cada feature crea su branch y directorio dentro de `.specify/`:
```
.specify/
  001-hero-redesign/
    spec.md                  # Especificacion
    plan.md                  # Plan tecnico
    tasks.md                 # Tareas de implementacion
    checklists/              # Checklists de calidad
```

---

## Ejemplo completo: Mejorar la seccion hero

```bash
# Paso 1: Iniciar spec-kit constitution (una sola vez por proyecto)
/speckit.constitution GearsMap: website minimalista, aesthetic, geospatial + AI,
  accesibilidad WCAG 2.1 AA, i18n ES/EN/FR, dark mode, performance-first

# Paso 2: Especificar la mejora
/speckit.specify Mejorar seccion hero: reducir padding en mobile,
  animacion de entrada mas sutil, gradiente OKLCH para el titulo,
  globe 3D con lazy loading para evitar CLS, CTA con hover effect

# Paso 3: Plan tecnico
/speckit.plan Next.js 16 App Router, Tailwind CSS 4, framer-motion,
  cobe para globe, shadcn/ui buttons

# Paso 4: Tareas
/speckit.tasks

# Paso 5: Implementar
/speckit.implement

# Paso 6: Verificar
/design-review
/i18n-check
/perf-check app/page.tsx
/simplify
```
