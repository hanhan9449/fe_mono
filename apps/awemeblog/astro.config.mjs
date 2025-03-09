// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import alpinejs from "@astrojs/alpinejs";

import preact from "@astrojs/preact";

import react from "@astrojs/react";

import solidJs from "@astrojs/solid-js";

import svelte from "@astrojs/svelte";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    // alpinejs(),
    // preact(),
    react(),
    solidJs(),
    // svelte()
  ],
  adapter: netlify(),
});
