// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const SITE = process.env.SITE || 'https://jorge1330c.github.io';
const BASE = process.env.BASE || '/';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [mdx()]
});
