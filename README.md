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

Todo el contenido (bio, experiencia, educación, certificaciones, proyectos) vive en un solo lugar:
[`src/data/content.ts`](src/data/content.ts). Editar ese archivo actualiza el sitio completo — no hace falta tocar los componentes.

## Deploy

El deploy a GitHub Pages es automático vía GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):
cada push a `main` construye el sitio y lo publica.

En GitHub, en **Settings → Pages**, la fuente ("Build and deployment") debe estar configurada en **GitHub Actions** (no en una rama).
