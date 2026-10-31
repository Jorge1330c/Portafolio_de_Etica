// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const SITE = process.env.SITE || 'https://example.github.io';
const BASE = process.env.BASE || '/';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [mdx()]
});
