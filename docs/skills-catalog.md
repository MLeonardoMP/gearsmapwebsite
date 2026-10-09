# Catálogo de skills — GearsMap

Revisión: 2026-09-07. Objetivo: disponer de un conjunto pequeño y canónico para UI/UX, Next/React y validación, sin instalar skills redundantes.

## Skills locales seleccionadas

| Skill | Procedencia local | Estado | Aplicación |
| --- | --- | --- | --- |
| `frontend-design` | `.agents/skills/frontend-design` | Usada | Dirección visual inmersiva y no genérica |
| `ui-ux-pro-max` | `.agents/skills/ui-ux-pro-max` | Consulta | Patrones y tendencias a contrastar con la marca |
| `web-design-guidelines` | `.agents/skills/web-design-guidelines` | Usada | Revisión de interfaz |
| `accessibility-compliance` | `.agents/skills/accessibility-compliance` | Seleccionada | WCAG, teclado, foco y contraste |
| `next-best-practices` | `.agents/skills/next-best-practices` | Usada | App Router, metadata, imágenes y RSC |
| `next-cache-components` | `.agents/skills/next-cache-components` | Usada | Cache Components, Suspense y PPR |
| `next-upgrade` | `.agents/skills/next-upgrade` | Seleccionada | Futuras actualizaciones mayores |
| `vercel-react-best-practices` | `.agents/skills/vercel-react-best-practices` | Usada | Bundle, cliente mínimo y waterfalls |
| `interaction-design` | `.agents/skills/interaction-design` | Seleccionada | Estados y microinteracciones intencionales |
| `responsive-design` | `.agents/skills/responsive-design` | Seleccionada | Layout y comportamiento responsive |
| `webapp-testing` | `.agents/skills/webapp-testing` | Usada | Validación black-box, axe y responsive |
| `playwright-best-practices` | `/home/leo/.agents/skills/playwright-best-practices` | Seleccionada | E2E y estabilidad de locators |

Cuando hay duplicados entre el inventario de proyecto y el global, se elige primero la copia del proyecto para que el trabajo respete su contexto. `playwright-best-practices` solo existe en el inventario global y se mantiene como referencia de pruebas.

## Candidatas externas revisadas

Se revisaron sus fichas públicas en skills.sh. Las instalaciones son una señal de adopción, no una garantía de calidad.

| Candidata | Fuente | Cuándo incorporarla | Estado |
| --- | --- | --- | --- |
| `next-cache-components-adoption` | [Vercel](https://www.skills.sh/vercel/next.js/next-cache-components-adoption) | Inicio de una migración de Cache Components | Cubierta por `next-cache-components` local y documentación oficial de Next 16.3 |
| `next-partial-prefetching-adoption` | [Vercel](https://www.skills.sh/vercel/next.js/next-partial-prefetching-adoption) | Adopción de Partial Prefetching | Cubierta por la misma skill local y validada con `instant()` |
| `next-cache-components-optimizer` | [Vercel](https://www.skills.sh/vercel/next.js/next-cache-components-optimizer) | Optimización después de medir rutas bloqueantes | Reservada para la siguiente iteración |
| `copywriting` | [marketingskills](https://www.skills.sh/coreyhaines31/marketingskills/copywriting) | Propuesta de valor, fichas y CTA B2B | Catálogo; el contenido editorial requiere aprobación |
| `page-cro` | [marketingskills](https://www.skills.sh/coreyhaines31/marketingskills/page-cro) | Revisión con tráfico y conversiones | Catálogo futuro |
| `seo-audit` | [marketingskills](https://www.skills.sh/coreyhaines31/marketingskills/seo-audit) | Nuevas páginas de servicios/casos | Catálogo futuro |
| `analytics-tracking` | [marketingskills](https://www.skills.sh/coreyhaines31/marketingskills/analytics-tracking) | Medición comercial con consentimiento definido | Catálogo futuro |

No se instala el paquete completo de candidatas externas mientras exista una copia local suficiente o falte la etapa que lo justifica. Antes de cualquier instalación se deben revisar instrucciones, scripts, compatibilidad y procedencia.
