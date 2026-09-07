import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { caseStudies } from './src/data/caseStudies.ts'
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from './src/data/siteMetadata.ts'

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// HTML por ruta para compartir fichas sin depender de que el lector ejecute JavaScript.
function projectPages() {
  let outputDirectory = ''
  return {
    name: 'project-pages',
    apply: 'build' as const,
    configResolved(config: { root: string; build: { outDir: string } }) { outputDirectory = resolve(config.root, config.build.outDir) },
    closeBundle() {
      const template = readFileSync(resolve(outputDirectory, 'index.html'), 'utf-8')
      const routes = [{ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION }, ...caseStudies.map(study => ({path: `/proyectos/${study.slug}/`, title: `${study.name} | Ethan Astorga · AI Engineer`, description: study.summary}))]
      for (const route of routes) {
        const url = SITE_URL + route.path
        const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(route.title)}</title>`)
          .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(route.description)}" />`)
          .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escape(route.title)}" />`)
          .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escape(route.description)}" />`)
          .replace('</head>', `<link rel="canonical" href="${url}" /><meta property="og:url" content="${url}" /><meta name="twitter:card" content="summary" /><meta name="twitter:title" content="${escape(route.title)}" /><meta name="twitter:description" content="${escape(route.description)}" /><meta property="og:image" content="${SITE_URL}/images/ethan-avatar.jpeg" /></head>`)
        const directory = resolve(outputDirectory, '.' + route.path)
        mkdirSync(directory, {recursive: true})
        writeFileSync(resolve(directory, 'index.html'), html)
      }
      writeFileSync(resolve(outputDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${SITE_URL}${route.path}</loc></url>`).join('')}</urlset>`)
      writeFileSync(resolve(outputDirectory, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), projectPages()],
})
