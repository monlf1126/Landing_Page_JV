import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: '/',
  css: {
    postcss: {
      plugins: [
        autoprefixer({})
      ]
    }
  }
})