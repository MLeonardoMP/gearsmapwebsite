# Flujo UI/UX y features — GearsMap

Este flujo reemplaza el inventario histórico de comandos y mantiene un proceso corto, verificable y reutilizable para mejoras de la home y futuras features.

## Ciclo de trabajo

1. **Brief breve**: objetivo comercial, superficie afectada, idiomas, estados y criterio de aceptación.
2. **Implementación**: reutilizar tokens, Radix, Tailwind, COBE y Server Components; añadir cliente solo donde exista interacción real.
3. **Revisión**: claro/oscuro, 390/768/1440 px, ES/EN/FR, teclado, `prefers-reduced-motion`, consola y axe.
4. **Evidencia**: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, `npm audit` y `npm run review:visual`.
5. **Entrega**: resumen, archivos relevantes, riesgos editoriales/operativos y reversión segura.

Las especificaciones extensas se reservan para features con estados, datos, API o decisiones de arquitectura. Para ajustes visuales basta el brief y la evidencia.

## Skills canónicas

Usar una sola copia por necesidad. El inventario completo y la procedencia de las candidatas externas están en [`docs/skills-catalog.md`](skills-catalog.md).

| Necesidad | Skill canónica | Uso |
| --- | --- | --- |
| Dirección visual | `frontend-design` | Lenguaje visual distintivo, tipografía, composición y no-genericidad |
| Patrones de UI | `ui-ux-pro-max` | Consulta comparativa, no checklist automático |
| Revisión de interfaz | `web-design-guidelines` | Revisión de usabilidad y consistencia |
| Accesibilidad | `accessibility-compliance` | WCAG, foco, contraste y semántica |
| Next/React | `next-best-practices` + `vercel-react-best-practices` | RSC, datos, bundle y waterfalls |
| Cache Components | `next-cache-components` | Cache, Suspense, PPR e instant navigation |
| Interacciones | `interaction-design` + `responsive-design` | Estados, microinteracciones y breakpoints |
| Validación | `webapp-testing` + `playwright-best-practices` | E2E, axe, navegación y escenarios responsive |

## Comandos de referencia

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm audit
npm run review:visual
```

`review:visual` captura la home en los tres anchos y ambos temas y emite una referencia de LCP, CLS, JavaScript transferido, overflow y errores de página. Se puede cambiar el destino con `GEARSMAP_BASE_URL` y `GEARSMAP_REVIEW_DIR`.

## Reglas de decisión

- Mantener el contenido institucional prerenderizable; no cachear el formulario ni sus envíos.
- No agregar otra librería de animación, motor 3D, CMS o infraestructura de caché para resolver un problema que ya cubren las dependencias actuales.
- Etiquetar toda composición gráfica sin evidencia como ilustrativa.
- Registrar todo copy nuevo en ES/EN/FR.
- Preferir `<details>` y contenido inline cuando no exista una necesidad real de diálogo.
