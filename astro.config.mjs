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
      footnoteLabel: "Endnotes",
      footnoteBackContent: "[^]",
    }
  },

  site: 'https://disjunctionsmag.com',

  // base: '/disjunctions',

  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});