// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Forzamos la ruta de tu repositorio para evitar errores en GitHub Pages
const SITE = 'https://jorge1330c.github.io';
const BASE = '/Portafolio_de_Etica/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/tags/')
    })
  ]
});
