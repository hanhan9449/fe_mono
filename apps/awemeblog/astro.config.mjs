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
import cloudflare from "@astrojs/cloudflare";
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
    mdx(), // alpinejs(),
    // preact(),
    react({
      include: ['**/react/*']
    }),
    svelte(),
    solidJs({
      include: ['**/solid/*', '**/solid-component/**']
    }),
    sitemap(),
    sentryIntegration,
  ],
  adapter: cloudflare(),
  site: "https://next.hanhan9449.top",
  output: "server",
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
});
