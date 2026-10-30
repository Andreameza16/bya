# Verificación de la demo

Ejecución local sobre la compilación de producción en Chrome, 5 de octubre de 2026. No hubo publicación externa.

## Checks de código

- `npm.cmd run lint`: pasó, sin errores ni warnings.
- `npm.cmd run build`: pasó, incluida la comprobación TypeScript y generación de páginas estáticas.
- `npm.cmd run test:smoke`: pasó.

## Navegador

- 20 rutas comprobadas con respuesta 200 y un H1.
- 30 comprobaciones de desbordamiento: seis páginas en 375 × 812, 390 × 844, 430 × 932, 768 × 1024 y 1440 × 900.
- Axe WCAG A/AA y 2.1 A/AA: cero infracciones detectadas en las 20 rutas muestreadas.
- Cero excepciones JavaScript de página detectadas.
- Filtros, búsqueda y estado vacío del catálogo.
- Validación, consentimiento, resumen y WhatsApp contextual de prematrícula.
- Aparición de solicitud en el panel, cambio de estado y CSV descargado.
- Aviso de seminario y registro en el panel.
- Selector de salón y mensaje contextual.
- Datos guardados del curso prellenados en el generador.
- Cuatro plantillas por tres formatos: 12 archivos PNG exportados, con firma PNG y dimensiones verificadas.
- Carga de foto, zoom, posición horizontal y vertical.
- Persistencia de borradores, menú móvil y tecla Escape.
- Metadata, JSON-LD, robots, sitemap e imagen Open Graph con respuesta correcta.

Las pruebas usan un contexto nuevo de navegador, datos explícitos de QA y no envían mensajes a WhatsApp. No utilizan el perfil personal de Chrome ni una base de datos remota. Los tamaños móviles son viewports simulados, no una prueba en teléfonos físicos.

## Lighthouse

Medición móvil local, con throttling simulado, sobre la portada de producción:

| Categoría | Resultado |
| --- | --- |
| Rendimiento | 94 |
| Accesibilidad | 100 |
| Buenas prácticas | 100 |
| SEO | 69 |
| Navegación de agentes | 100 |

El único fallo puntuado de SEO es **la exclusión intencional de indexación de la demo**. Se activa el SEO público con un dominio HTTPS confirmado y `NEXT_PUBLIC_ALLOW_INDEXING=true`; esto requiere recompilación. No se activó indexación de un dominio ficticio para aumentar una puntuación. El resultado público debe medirse de nuevo después del lanzamiento.

Estas mediciones locales varían según equipo y condiciones y no equivalen a datos de campo, una certificación WCAG o una promesa de rendimiento en producción.

## Evidencias

- `artifacts/qa-report.json`: resultados estructurados de la suite.
- `artifacts/lighthouse-home.report.html` y `.json`: Lighthouse.
- `artifacts/home-*.png`: portadas completas en cinco tamaños, incluyendo imágenes lazy cargadas para la captura.
- `artifacts/preview-desktop.png`, `preview-mobile.png`, `preview-generator.png`: capturas sin datos de QA.
- `artifacts/publicacion-ejemplo.png`: exportación limpia real de 1080 × 1350, con fecha por confirmar.
- `artifacts/{editorial,seminar,salon,enrollment}-{square,portrait,story}.png`: exports de QA, no material para publicar.

## Antes de presentar y lanzar

Sustituir el monograma por el logo oficial y las composiciones conceptuales por material propio autorizado. Confirmar cursos vigentes, fechas, precios, dirección, equipo y valoración de Google. Revisar los archivos de información y assets pendientes con el negocio. El almacenamiento remoto, la autenticación y la gestión entre dispositivos pertenecen a la fase 2.
