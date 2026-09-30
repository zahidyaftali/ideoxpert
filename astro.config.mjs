import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ideoxpert.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  compressHTML: false,
});
