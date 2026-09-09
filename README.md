# ethan1213.github.io

Portafolio personal de Ethan Astorga — AI Engineer. Construido con React, TypeScript, Vite y Tailwind CSS.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
```

## Contenido

El contenido está separado según su función:

- `src/data/content.ts`: perfil, experiencia, educación, certificaciones y comunidad.
- `src/data/caseStudies.ts`: catálogo, categorías, estados y casos completos. La portada y las páginas estáticas se derivan de este arreglo.
- `src/data/evidence.ts`: enlaces y alcance de las verificaciones de cada caso.
- `src/data/governanceRun.ts` y `public/evidence/governance-comparison.json`: resumen agregado de la ejecución local del Testkit del 7 de septiembre de 2026.
- `src/data/siteMetadata.ts`: identidad, URL y metadatos generales.

Los casos de gobernanza abren el recorrido. El catálogo filtra entre gobernanza, machine learning y software. Se mantiene la información anterior de experiencia, educación y proyectos.

## Evidencia y límites

Testkit y Privacy Gateway tienen código privado: sus fichas muestran arquitectura y resúmenes autorizados, sin publicar el corpus, documentos ni archivos internos. DetectVoice, CiberSegurIA y Andamio enlazan código público. No confundir una prueba local, una revisión de CI y una auditoría independiente.

Para actualizar los resultados del Testkit, ejecutar los tres perfiles sobre la misma versión, comprobar los totales y actualizar juntos el archivo de datos y el JSON público. Conservar fecha, método y límites; nunca copiar logs completos con rutas locales o información de terceros al sitio.

## Metadatos y rutas

El build genera `index.html` por caso, con título, descripción, canonical y metadatos sociales propios, además de `sitemap.xml` y `robots.txt`. El contenido visual sigue renderizándose con React; esto no es renderizado completo en servidor. Los archivos HTML permiten servir los casos en GitHub Pages sin depender del fallback 404 y compartir sus metadatos sin ejecutar JavaScript.

`PageMetadata` mantiene los metadatos al navegar dentro de la aplicación. Los enlaces heredados a los dos casos originales continúan funcionando.

## Deploy

El deploy a GitHub Pages es automático vía GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):
cada push a `main` construye el sitio y lo publica.

En GitHub, en **Settings → Pages**, la fuente ("Build and deployment") debe estar configurada en **GitHub Actions** (no en una rama).


## Demos reproducibles y CV

El portafolio presenta ocho casos con alcance explícito: cinco proyectos iniciales, DemandLab, LLM Evidence Lab y el core de ComplianceAI Chile. La información de trayectoria y el CV anterior se conservan; el CV enfocado en AI Engineer vive en `public/cv/Ethan-Astorga-AI-Engineer.pdf`.

- `labs/demandlab`: modelo ridge real, baseline estacional, backtesting y 19 pruebas.
- `labs/llm-evidence-lab`: recuperación, evaluación, citas, abstención y adaptador opcional de Ollama; 12 pruebas. No se ejecutó un LLM real.
- `public/demos`: informes HTML/JSON sintéticos y código descargable de los dos laboratorios públicos.
- `src/data/researchStudies.ts`: fichas nuevas, con métricas y límites.

Ejecutar cada laboratorio desde su carpeta con `python -m unittest discover -s tests -v`. Las demos se regeneran con `python -m demandlab demo` y `python -m llm_evidence_lab evaluate`. Después de modificar un laboratorio, regenerar su informe y ZIP público para mantener código y evidencia alineados. No publicar informes de datos privados como si fueran las demos sintéticas.
