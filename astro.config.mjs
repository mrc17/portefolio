// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://axeltoure.com',
  trailingSlash: 'always',

  integrations: [react(), sitemap(), icon()],

  // Polices téléchargées au build et servies depuis le site (pas de requête tierce bloquante),
  // avec des polices de secours aux métriques ajustées pour éviter les sauts de mise en page.
  fonts: [
    {
      provider: fontProviders.bunny(),
      name: 'Figtree',
      cssVariable: '--font-figtree',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.bunny(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: [400, 500],
      styles: ['normal'],
      fallbacks: ['monospace'],
    },
  ],

  // CSS intégré au HTML : supprime la feuille de style bloquante du chemin critique.
  build: {
    inlineStylesheets: 'always',
  },

  vite: {
    plugins: [tailwindcss()]
  }
});