// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  fonts: [
    { 
      provider: fontProviders.fontsource(),
      name: "VT323",
      cssVariable: "--font-pixels",
      fallbacks: ["monospace"],
      styles: ["normal", "italic"],
    },
    { 
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      fallbacks: ["monospace"],
      weights: [400, 500, 600, 700, 800],
      styles: ["normal", "italic"],
    }
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  // change to your domain
  site: "https://decker-theme.pages.dev",

  integrations: [sitemap()],
  adapter: cloudflare()
});