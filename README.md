# Brújula Ética · Portafolio digital HUM-010

Universidad Científica del Sur · 2026-2 · Ingeniería Empresarial y de Sistemas · Sinergia Sistémica.

Proyecto Astro 5 + MDX + Sass. Se mantienen el tema oscuro/claro, navegación, efectos, reproductor Spotify y recursos audiovisuales originales.

## Ejecutar

Usa Node.js **22.19 o superior (recomendado 24)** y npm.

```bash
npm ci
npm run dev
npm run build
npm run preview
```

La ruta local suele ser http://localhost:4321/. GitHub Pages usa el workflow incluido en `.github/workflows/deploy.yml`, con `SITE` y `BASE` obtenidos del repositorio. Para probar la ruta del repositorio en local: `SITE=https://jorge1330c.github.io BASE=/Portafolio_de_Etica/ npm run build` (Bash).

## Revisión integral según AC1

Se incorporó la ficha AC1 entregada por el usuario: metáfora del Faro de La Punta, propósito colectivo, propósito de la carrera y los tres conceptos aristotélicos. Cada entrada AC2–AC11 y las evaluaciones conecta explícitamente con el fundamento de AC1. Se normalizó la denominación Ingeniería Empresarial y de Sistemas, se amplió AC2 con la población priorizada en AC10/AC11 y se distinguieron los textos originales de las propuestas de aplicación. Se conserva el diseño y los archivos multimedia.

## Contenido actualizado

- `src/pages/infografia.astro`: AC10 y AC11 en una pieza visual de dos capas.
- `src/lib/integridad.ts`: textos de las fichas completadas y prompt exacto AC11.
- `src/content/bitacora/`: 11 aprendizajes colaborativos y entradas EC1, EP, EC2 y EC3.
- `src/lib/referencias.ts`: bibliografía de las fichas y sesiones.
- `src/pages/podcast.astro` y `video-reaccion.astro`: reproductores y análisis de apoyo; no se presentan como transcripciones.
- `src/lib/team.ts`: cuatro integrantes de las fichas AC10/AC11, códigos actualizados y orden alfabético. La lista previa incluía a Jhoseph Hilario; se conserva en `documentacion/team-original.ts.txt` para confirmar su situación.
- `public/media/`: audio y video originales y tres propuestas vectoriales para AC11.

## Antes de presentar o publicar

1. Confirmar el caso real tratado en el podcast y la video-reacción: no se entregó guion escrito ni transcripción. Los análisis de AC5–AC9 son propuestas de aplicación de las sesiones al tema de AC10, no afirmaciones sobre lo que dicen las grabaciones.
2. Revisar el archivo de video: los fotogramas muestreados aparecieron negros; se conserva sin alterar, con audio incluido. Comprobar reproducción y reemplazarlo por una copia visual correcta si corresponde.
3. Validar las tres variantes vectoriales y sustituirlas por imágenes de estilo fotográfico si la rúbrica lo exige. No se recibieron imágenes finales de Firefly, ni prueba de selección por el equipo. La fotografía AC10 viene de la ficha; confirmar autor, permiso y procedencia antes de publicarla.
4. Verificar el antecedente ambiental de Espinar y el texto vigente del código deontológico con fuentes oficiales antes de sustentar. El sitio atribuye el antecedente a la ficha AC11 y las propuestas al análisis académico.
5. Confirmar los integrantes, códigos y consentimiento antes de publicar datos personales. La lista de cuatro personas se tomó de las fichas más recientes, sin inferir qué ocurrió con el quinto integrante. No se inventaron fotos o LinkedIn.
6. EC3 está preparada como guía de sustentación, no marcada como evaluación rendida. Validar reflexiones y compromisos con el equipo.

## Estado de verificación técnica

En esta revisión se verificaron 124 referencias locales, las 15 entradas, la denominación de la carrera y la conservación de los archivos multimedia y estilos. Se comprobó la sintaxis TypeScript de los módulos de contenido independientes. La instalación de dependencias en este entorno falló por resolución DNS de registry.npmjs.org (EAI_AGAIN); no fue posible ejecutar una compilación completa. Ejecutar `npm ci` y `npm run build` en un equipo con conexión.

## Fuentes integradas

Ficha AC10 (`DOC-20261118-WA0011.docx`), ficha AC11 (`Sin título 2.pdf`), presentaciones de sesiones 6 a 15, manifiesto original y ficha AC1 facilitada en el chat. La portada de la sesión 10 indica 2026-1 aunque el nombre del archivo indica 2026-2. No se incluyen las presentaciones originales en el repositorio público.

