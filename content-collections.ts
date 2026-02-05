import { defineCollection, defineConfig } from '@content-collections/core';
import {
  createDocSchema,
  createMetaSchema,
  transformMDX,
} from '@fumadocs/content-collections/configuration';
import { rehypeCode, rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { transformerTwoslash } from "fumadocs-twoslash";
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { z } from 'zod';

const docs = defineCollection({
  name: 'docs',
  directory: 'content/docs',
  include: '**/*.mdx',
  schema: z.object({
    ...createDocSchema(z),
    content: z.string(),
  }),
  transform: (document, context) => {
    return transformMDX(document, context, {
      remarkPlugins: [remarkGfm, remarkMdx],
      rehypePlugins: [rehypeCode],
      rehypeCodeOptions: {
        themes: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha",
        },
        transformers: [
          ...(rehypeCodeDefaultOptions.transformers ?? []),
          transformerTwoslash(),
        ]
      }
    });
  },
});

const metas = defineCollection({
  name: 'meta',
  directory: 'content/docs',
  include: '**/meta.json',
  parser: 'json',
  schema: z.object(createMetaSchema(z)),
});

export default defineConfig({
  collections: [docs, metas],
});
