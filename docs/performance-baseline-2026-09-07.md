# Referencia de rendimiento — 2026-09-07

Medición local sobre `next start` con build de producción de Next.js 16.3.3. Cada escenario usó un contexto nuevo de Playwright, esperó la home completa y capturó métricas después de cargar fuentes y contenido inicial.

| Viewport | Tema | LCP | CLS | JS transferido | Scripts | Overflow | Errores |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| 390 × 844 | oscuro | 172 ms | 0 | 198.766 B | 11 | no | 0 |
| 390 × 844 | claro | 84 ms | 0 | 198.766 B | 11 | no | 0 |
| 768 × 900 | oscuro | 100 ms | 0 | 198.766 B | 11 | no | 0 |
| 768 × 900 | claro | 132 ms | 0 | 198.766 B | 11 | no | 0 |
| 1440 × 900 | oscuro | 120 ms | 0 | 198.766 B | 11 | no | 0 |
| 1440 × 900 | claro | 140 ms | 0 | 198.766 B | 11 | no | 0 |

## Lectura

- La referencia de laboratorio está por debajo de los objetivos LCP ≤ 2.5 s y CLS ≤ 0.1.
- El JavaScript inicial transferido es constante entre viewports porque la misma shell sirve las variantes.
- No hubo overflow horizontal ni `pageerror` en los seis escenarios.
- Estos números son una referencia de laboratorio local, no una promesa de campo ni una comparación histórica: el checkout no conserva una captura numérica anterior equivalente.
- La referencia se puede repetir con:

```bash
GEARSMAP_BASE_URL=http://127.0.0.1:3000 \
GEARSMAP_REVIEW_DIR=/tmp/gearsmap-visual-review-prod \
npm run review:visual
```

Para cerrar rendimiento en producción se requieren tres ejecuciones equivalentes en preview/CDN, separando caché fría y caliente, y una medición de INP de campo cuando haya tráfico suficiente.
