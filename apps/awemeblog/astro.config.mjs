// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import alpinejs from "@astrojs/alpinejs";

import preact from "@astrojs/preact";

import react from "@astrojs/react";

import solidJs from "@astrojs/solid-js";

import svelte from "@astrojs/svelte";

import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

import sentry from "@sentry/astro";

const sentryIntegration = sentry({
  dsn: "https://8c46c1788ebe5f44f8a7d27c67952beb@o4508999636942848.ingest.us.sentry.io/4508999640547328",
  tracesSampleRate: 0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  sourceMapsUploadOptions: {
    project: "awemeblog-astro",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  },
});

// https://astro.build/config
export default defineConfig({
  integrations: [
    // alpinejs(),
    mdx(), // preact(),
    react(),
    svelte(),
    solidJs(),
    sitemap(),
    sentryIntegration,
  ],
  adapter: netlify(),
  site: "https://next.hanhan9449.top",
});
