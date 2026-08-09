import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

import rehypeFootnoteBackrefOnNumber from "./src/plugins/rehype-footnote-backref.mjs";
console.log('TYPE:', typeof rehypeFootnoteBackrefOnNumber, rehypeFootnoteBackrefOnNumber);

// https://astro.build/config
export default defineConfig(
/** @type {import('astro').AstroUserConfig} */
{
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [rehypeFootnoteBackrefOnNumber],
    shikiConfig: {
      theme: 'poimandres',
      langs: [],
      wrap: false
    },
    remarkRehype: {
      footnoteLabel: "Notes",
      footnoteBackContent: "[^]",
      clobberPrefix: "",
    }
  },
  site: import.meta.env.PROD ? "https://disjunctionsmag.com" : "http://localhost:4321",
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx()],
  redirects: {
    "/technology-question-today": "/articles/technology-question-today"
  }
});