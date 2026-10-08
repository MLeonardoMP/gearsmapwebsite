# Plan general de mejora de GearsMap — 2026

Estado: primera entrega implementada en la home y componentes compartidos. El repositorio no conserva historial Git utilizable; este documento es la referencia operativa vigente.

## Objetivo

Convertir GearsMap en una experiencia tecnológica reconocible y orientada a captar clientes B2B mediante dos recorridos: **conversemos sobre un proyecto** y **solicitar una demo**.

## Frente 1 — UI/UX e identidad

Completado:

- [x] Hero con el concepto «del territorio al dato, del dato a la decisión», globo COBE, capas cartográficas, microinteracciones y dos CTA.
- [x] Sistema visual propio en claro y oscuro: Sora para titulares, Manrope para lectura, tokens OKLCH, grid, superficies profundas y acento turquesa.
- [x] Home organizada en hero, tecnologías, servicios inline, proyectos, equipo, proceso y contacto.
- [x] Fichas locales tipadas para ACGGP, MRV y M&E, además de los proyectos previos; MRV/M&E muestran explícitamente «En desarrollo» y visuales ilustrativos.
- [x] Selector visible de intención `project` / `demo`, con CTA de demo en fichas y CTA de proyecto en hero.
- [x] Globo diferido con fallback estático, reserva de dimensiones, pausa fuera de viewport/pestaña y calidad reducida en móvil.
- [x] Teclado, focus visible, contraste, `prefers-reduced-motion` y desplazamiento nativo revisados.

Pendiente editorial:

- [ ] Validar con el equipo qué imágenes, enlaces, métricas y resultados de MRV/M&E son publicables.
- [ ] Sustituir o ampliar visuales ilustrativos únicamente cuando exista evidencia aprobada.

## Frente 2 — Rendimiento y navegación

Completado:

- [x] Next.js, `eslint-config-next` y `@next/playwright` en 16.3.3; React 19 compatible.
- [x] Cache Components y Partial Prefetching habilitados en `next.config.mjs`.
- [x] Fronteras `Suspense` para `params` localizados y shell reutilizable para evitar bloqueos de navegación.
- [x] `instant()` cubierto por E2E para la navegación home → privacidad, con preservación de ancla al cambiar idioma.
- [x] Contacto permanece dinámico: el formulario y `POST /api/contact` no participan en caché de contenido.
- [x] Dependencias auditadas: `npm audit` sin vulnerabilidades conocidas.
- [x] Medición reproducible de LCP, CLS, JavaScript transferido, overflow y errores de página en 390/768/1440 px y claro/oscuro.

Pendiente de operación:

- [ ] Repetir la medición en preview/CDN con tres ejecuciones por escenario y registrar caché fría/caliente.
- [ ] Añadir INP de campo cuando exista tráfico suficiente; objetivo de laboratorio: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms.
- [ ] Verificar entrega de correo y persistencia con destinatarios de prueba autorizados.

## Frente 3 — Skills y flujo de trabajo

Skills canónicas seleccionadas y documentadas en [`docs/skills-catalog.md`](docs/skills-catalog.md). Para evitar sobreingeniería, se reutilizan las copias locales y no se instala un paquete completo de CRO/SEO/analytics en esta entrega.

Flujo vigente:

1. Brief breve y criterio de aceptación.
2. Implementación con Server Components por defecto.
3. Revisión visual/funcional en 390, 768 y 1440 px, tres idiomas, dos temas, teclado y movimiento reducido.
4. Evidencia reproducible: lint, tipos, build, E2E, auditoría y medición visual.

## Backlog priorizado

| Estado | Entregable | Criterio de aceptación |
| --- | --- | --- |
| Hecho | Rediseño de home y contacto | CTA, intentos, idiomas y temas cubiertos |
| Hecho | Next 16.3.3 + navegación instantánea | Build PPR y prueba `instant()` pasan |
| Hecho | Medición local de referencia | JSON de seis escenarios sin overflow ni errores |
| Pendiente | Material editorial MRV/M&E | Evidencia y enlaces aprobados |
| Pendiente | Verificación real de correo/DB | Prueba autorizada documentada |
| Futuro | CRO, SEO y analytics comercial | Se incorporan solo con una necesidad de medición definida |
| Fuera de esta entrega | Blog, pricing, páginas nuevas, CMS, motor 3D adicional | No se implementan sin nuevo brief |

## Reversión segura

Si la navegación instantánea genera una regresión en preview, desactivar temporalmente `cacheComponents` y `partialPrefetching` en `next.config.mjs`, conservar las fronteras `Suspense` y repetir lint, build y E2E. No eliminar el modelo tipado ni el contrato `intent`.
