import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig(
/** @type {import('astro').AstroUserConfig} */
{
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    shikiConfig: {
      theme: 'poimandres',
      langs: [],
      wrap: false
    },
    remarkRehype: {
      footnoteLabel: "Notes",
      footnoteBackContent: "[^]",
    }
  },

  site: import.meta.env.PROD ? "https://disjunctionsmag.com" : "http://localhost:4321",

  // base: '/disjunctions',

  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});