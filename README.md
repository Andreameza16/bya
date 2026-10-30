# Belleza y Armonía · Salón y Academia

Demo comercial para una academia de belleza y barbería y su salón en Masaya, Nicaragua. Prioriza descubrir una formación, preparar una solicitud y continuar por WhatsApp. Incluye un panel de trabajo y un taller de publicaciones que exporta PNG en el navegador, sin IA ni servicios de pago.

## Ejecutar

Requiere Node.js 20.9 o superior y npm. En PowerShell, usá `npm.cmd` para evitar restricciones del shim `npm.ps1`.

```powershell
cd 'D:\Users\Andrea\Bussiness\Belleza Y Armonía Academia'
npm.cmd ci
npm.cmd run dev
```

Abrí [http://127.0.0.1:3000](http://127.0.0.1:3000). El panel está en [http://127.0.0.1:3000/admin](http://127.0.0.1:3000/admin).

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd start
```

Las fuentes están incluidas en `src/assets/fonts` con sus licencias OFL. La compilación no necesita acceder a Google Fonts.

## Stack y estructura

Next.js App Router, React, TypeScript, Tailwind CSS 4 y CSS con tokens de marca, Lucide, React Hook Form y Zod. Canvas HTML5 realiza la composición, el recorte y la exportación. No se necesita Konva, un editor libre ni una librería de animaciones: las transiciones discretas se resuelven con CSS.

```text
src/app/(site)/             Páginas públicas, layout, cursos y formularios
src/app/admin/              Panel de demostración y taller de publicaciones
src/components/            Componentes públicos y operativos
src/data/                  Información centralizada del brief
src/lib/                   WhatsApp, metadatos, datos locales y render de publicaciones
src/assets/fonts/          Cormorant Garamond y Manrope, alojadas localmente
public/images/             Ilustraciones originales reemplazables
tools/                     Pruebas de navegador y generación de assets
artifacts/                 Capturas, publicaciones exportadas y reporte de QA; ignorado en Git
```

## Rutas

| Ruta                                              | Función                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| `/`                                               | Portada, cursos, enfoque práctico, ciudades, valoración observada y salón |
| `/academia`                                       | Catálogo con filtros y búsqueda                                           |
| `/academia/[slug]`                                | Ficha, contenido, preguntas frecuentes y solicitud prellenada             |
| `/seminarios`                                     | Temas, convocatorias pendientes y solicitud de aviso                      |
| `/salon`                                          | Selector de categorías y WhatsApp contextual                              |
| `/nosotros`                                       | Propuesta prudente, instructores mencionados y ciudades                   |
| `/contacto`                                       | Contacto y prematrícula                                                   |
| `/privacidad`                                     | Funcionamiento real de los datos en la demo                               |
| `/admin`                                          | Resumen calculado a partir de los datos locales                           |
| `/admin/cursos`, `/admin/cursos/[slug]`           | Fichas, datos de trabajo y creación de publicaciones                      |
| `/admin/seminarios`                               | Datos de seminarios e interesados en próximas fechas                      |
| `/admin/servicios`                                | Notas sobre las categorías del salón                                      |
| `/admin/prematriculas`                            | Solicitudes, filtros, estados, contacto, borrado y exportación CSV        |
| `/admin/publicaciones`                            | Carga de foto, recorte, contenido, plantillas, formatos y descarga        |
| `/admin/configuracion`                            | Preferencias del taller y referencia del negocio                          |
| `/robots.txt`, `/sitemap.xml`, `/opengraph-image` | Recursos SEO y vista al compartir                                         |

## Información del negocio

Editá `src/data/business.ts` para nombre, WhatsApp, correo, ciudad, enlace de Google Maps y valoración observada. `src/data/navigation.ts` controla la navegación. Programas, seminarios, servicios e instructores tienen archivos separados.

El brief es la fuente de los datos. `verified` y `status` distinguen información histórica, pendiente o confirmada. La duración de uñas es una duración publicada, no una promesa de la convocatoria actual. No se inventaron precios, fechas, certificaciones, estadísticas, testimonios ni una dirección exacta. La valoración de Google se muestra como observada; no se utiliza como `aggregateRating` en JSON-LD.

Para añadir un programa, agregá una entrada de tipo `Course` a `src/data/courses.ts`, con slug único, imagen local y datos de procedencia. El catálogo, la ficha, el formulario, el sitemap y el selector del taller se actualizan con esa entrada. Los seminarios se derivan de `type: "Seminario"`.

El panel guarda fechas, ciudad, precio y duración **para preparar publicaciones**. Estos cambios locales no modifican el catálogo público ni los archivos del proyecto. Esta frontera está indicada en el panel. Confirmá un dato antes de incorporarlo a la información pública.

## Formularios y WhatsApp

Zod valida los campos y el consentimiento. La solicitud queda en este navegador y se presenta un resumen. El negocio recibe la consulta solamente cuando la persona envía el mensaje preparado en WhatsApp. El formulario no realiza una reserva ni procesa un pago.

`src/lib/whatsapp.ts` centraliza mensajes y enlaces codificados. Todos los accesos a WhatsApp llevan contexto. Los horarios y las ciudades elegidos en el formulario son preferencias; no afirman disponibilidad.

Los registros se guardan en claves `ba:*:v1` de `localStorage`. Otra persona que use ese mismo navegador puede acceder a ellos desde la demo. Se pueden borrar desde el panel o desde los datos del sitio en el navegador. No hay sincronización entre dispositivos, correos automáticos ni almacenamiento remoto. El navegador puede bloquear el almacenamiento o quedarse sin espacio; los componentes muestran errores en esos casos.

## Taller de publicaciones

Entrá a `/admin/publicaciones` o usá **Crear publicación** desde un programa. Los datos guardados de ese programa se prellenan automáticamente. Podés cargar otro curso con el selector.

1. Elegí el tipo de publicación y ajustá título, subtítulo, fecha, ciudad, precio opcional, WhatsApp y CTA.
2. Subí JPG, PNG o WebP de hasta 15 MB. La imagen se normaliza localmente; nunca se envía a un servidor.
3. Ajustá zoom y posiciones horizontal y vertical. El área de la plantilla recorta la imagen automáticamente.
4. Elegí Academia Editorial, Seminario Profesional, Salón o Inscripciones.
5. Exportá 1080 × 1080, 1080 × 1350 o 1080 × 1920.
6. Guardá o recuperá borradores locales, incluyendo la foto. Si la cuota local se agota, descargá el PNG o utilizá una imagen más liviana.

La vista previa y la descarga utilizan el mismo renderer en `src/lib/post-renderer.ts`. Los textos no se mueven libremente y los colores y fuentes están fijados. Para añadir una plantilla, ampliá `TemplateId`, `postTemplates` y la composición en `renderPost`; probá los tres formatos y títulos largos. No agregues posiciones arbitrarias ni un editor tipo Canva.

## Imágenes y diseño

`DESIGN.md` documenta la paleta, tipografías, composición y reglas. Las imágenes SVG son ilustraciones originales de la demo, creadas mediante `tools/create-art.mjs`; no son fotos del negocio ni evidencias de resultados. Todas tienen un rótulo de imagen conceptual. El monograma es provisional.

Para sustituirlas, agregá archivos autorizados a `public/images/business`, `courses`, `salon` o `instructors` y actualizá los `image` de los datos o las referencias de cada sección. `ImagePlaceholder` utiliza `next/image`; al incorporar fotografía real, retirale el rótulo conceptual y utilizá un texto alternativo factual. Optimizá a WebP o AVIF y conservá la proporción del contenedor.

No hay comparaciones antes/después hasta recibir pares reales y autorizados. Las fotos de estudiantes, clientes e instructores requieren autorización de uso. Consultá `CLIENT_ASSETS_NEEDED.md` y `CLIENT_INFORMATION_NEEDED.md`.

## SEO y lanzamiento

Metadatos por página, canonical, idioma `es-NI`, Open Graph, Twitter card, imagen social, sitemap y robots. JSON-LD declara el negocio y la organización educativa con los datos proporcionados; no incluye horarios, calle, precios, certificaciones ni testimonios no confirmados. La ruta admin está excluida de indexación.

Por defecto esta **demo** no se indexa. Para el lanzamiento real, copiá `.env.example` a `.env.local`, usá el dominio HTTPS confirmado y activá la indexación:

```dotenv
NEXT_PUBLIC_SITE_URL=https://dominio-confirmado-del-negocio.example
NEXT_PUBLIC_ALLOW_INDEXING=true
```

Recompilá después de cambiar estas variables. No utilices el dominio de ejemplo. Confirmá los datos y sustituí las ilustraciones con material real antes de indexar.

Se configuraron cabeceras de contenido, referer, frames y permisos. El panel es una demo pública sin autenticación y guarda datos exclusivamente locales. Para almacenar datos reales de forma centralizada en producción, implementá autenticación y autorización del lado del servidor.

## Verificación

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
# Con el servidor ya ejecutándose:
npm.cmd run test:smoke
```

La prueba usa el Chrome o Edge instalado en Windows. En otro sistema configurá `BROWSER_PATH` para un Chromium compatible o instalá el navegador de Playwright. `QA_URL` permite elegir otro puerto. La prueba crea su propio contexto de navegador, no usa tu perfil personal y no envía mensajes a WhatsApp.

Verifica rutas, filtros y búsquedas, validación y resumen, seguimiento de solicitudes, CSV, avisos de seminarios, selección de salón, datos prellenados, carga y recorte de foto, borradores, descarga de las 12 combinaciones plantilla/formato, metadatos, menú con Escape y desbordamiento en 375, 390, 430, 768 y 1440 px. Axe revisa una muestra de páginas WCAG A/AA. Guarda evidencias en `artifacts/qa-report.json` y capturas. Las pruebas automatizadas no equivalen a certificación WCAG ni a una medición Lighthouse.

## Fase 2

- Sustituir `src/lib/local-store.ts` por persistencia mediante endpoints con validación en servidor, autorización, consentimiento y retención documentados.
- Proteger el panel y gestionar solicitudes entre dispositivos, sin confundir preparación de consulta con matrícula confirmada.
- Añadir calendario real y gestión de contenidos sólo cuando el negocio confirme el flujo.
- Incorporar política definitiva de privacidad, reservas y devoluciones.
- Integrar mejora de imágenes sólo si se solicita. `ImageEnhancementProvider` y `NoOpImageEnhancementProvider` están desacoplados en `src/lib/enhancement.ts`. Un proveedor real debe ejecutarse mediante un endpoint servidor; nunca introducir claves API en el frontend.
- LMS, pagos, certificados, inventario y CRM quedan fuera de esta versión.

Referencias de UX consultadas: [Davines](https://world.davines.com/), [Modern Hairstyling Institute](https://www.modern.edu/) y [Paul Mitchell Schools](https://paulmitchell.edu/programs). No se reutilizaron sus assets, textos ni código. Implementación apoyada en la [documentación de Next.js](https://nextjs.org/docs) y [Tailwind CSS](https://tailwindcss.com/docs).
