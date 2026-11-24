import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bitacora = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/bitacora' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    topic: z.string(),
    number: z.string(),
    order: z.number(),
    section: z.string().optional(),
    authors: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    surface: z.enum(['peach', 'mint', 'yellow', 'mustard', 'canvas']).default('canvas'),
    cover: z.object({
      src: image(),
      alt: z.string().optional(),
      credit: z.string().optional()
    }).optional(),
    gallery: z.array(z.object({
      src: image(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      credit: z.string().optional()
    })).optional(),
    music: z.object({
      spotify: z.string().optional(),
      youtube: z.string().optional(),
      title: z.string().optional(),
      note: z.string().optional()
    }).optional()
  })
});

export const collections = { bitacora };
