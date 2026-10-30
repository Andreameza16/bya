# Belleza y Armonía · Contrato visual

Plataforma para personas que llegan desde redes sociales y WhatsApp en Nicaragua. Academia primero, salón después. Dirección editorial, sobria y accesible: el talento como oficio, con amplitud tipográfica y composiciones propias.

## Color

| Token          | Valor     | Función                                       |
| -------------- | --------- | --------------------------------------------- |
| Marfil         | `#FAF7F3` | Fondo principal, espacio y claridad           |
| Negro ciruela  | `#211B1E` | Texto, navegación, bloques premium y panel    |
| Rosa           | `#B54770` | CTA, activo, énfasis                          |
| Rosa hover     | `#9D365D` | Interacción y contraste                       |
| Rosa empolvado | `#F0DDE4` | Salón, badges y superficies suaves            |
| Champán        | `#C3A06D` | Academia, separadores e indicadores discretos |
| Malva          | `#756A75` | Texto secundario                              |
| Blanco         | `#FFFFFF` | Formularios y áreas de trabajo                |

Predomina marfil/blanco. El ciruela estructura, el rosa dirige y el champán acompaña. No añadir una paleta distinta por sección ni usar oro para texto pequeño sobre marfil.

## Tipografía

Cormorant Garamond para titulares editoriales, énfasis en cursiva de la misma familia y cifras expresivas. Manrope para interfaz, texto, panel y formularios. Fuentes variables locales mediante `next/font/local`, con `display: swap`. Respetar espacio para descendentes de cursivas.

## Composición y componentes

- Portada en dos columnas: mensaje académico a la izquierda, arte conceptual a la derecha. CTA visible, valoración observada y procedencia.
- Ritmo variado: catálogo, bloque práctico, ciudades, referencia Google, salón y cierre ciruela.
- Contenedores de hasta 1280 px y margen reducido en móvil. Sin scroll horizontal ni scroll hijacking.
- Botones redondeados; imágenes 2 px; controles y tarjetas operativas 3–4 px. Esta distinción es intencional: acciones suaves y contenido editorial preciso.
- Cards de cursos sin cajas decorativas ni sombras. Fotografías/ilustraciones y líneas organizan la información.
- El panel utiliza Manrope para títulos operativos y tablas. Las publicaciones conservan el serif de marca.
- Cuatro plantillas controladas, posiciones fijadas, textos con límites y recorte de foto. No diseño libre.
- Hover y cambios de estado entre 200–500 ms; `prefers-reduced-motion` desactiva lo no esencial. Sin animaciones permanentes ni loaders artificiales.
- Foco visible, saltar al contenido, labels y errores asociados, teclado, consentimiento y controles de 44 px o más en móvil.

## Veracidad

Las ilustraciones son conceptos, no evidencias de resultados ni retratos reales. No mostrar testimonios inventados, estadísticas, certificación ni información operacional sin confirmar. Los datos faltantes se indican en lenguaje útil. Las ciudades muestran presencia histórica, no una agenda actual.
