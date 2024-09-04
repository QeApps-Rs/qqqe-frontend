// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  base: 'https://apps.qeapps.com/ecom_apps_n/production/qqqe-frontend/dist',
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
