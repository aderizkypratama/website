// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GANTI dengan domain aslimu setelah membeli domain (tanpa garis miring di akhir).
const SITE_URL = 'https://example.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', id: 'id-ID' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: { prefixDefaultLocale: false },
  },
  build: {
    // Semua CSS jadi file terpisah, supaya Content-Security-Policy ketat (style-src 'self') bisa dipakai.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Jangan sisipkan script kecil secara inline (script-src 'self').
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    // Highlighter bawaan memakai atribut style inline yang akan diblokir CSP.
    // Blok kode tetap tampil, hanya tanpa pewarnaan sintaks.
    syntaxHighlight: false,
  },
});
