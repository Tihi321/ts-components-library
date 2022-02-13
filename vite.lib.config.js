import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite';

import { LIBRARY_NAME } from "./src/constants/library";

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    lib:{
      entry: './src/web-components.ts',
      name: LIBRARY_NAME,
      formats: ['umd'],
      fileName: () => `index.js`
    },
    rollupOptions: {
      output: {
        dir: "cdn",
        compact: true,
      },
      manualChunks: () => 'everything.js',
      preserveModules: false
    }
  },
  plugins: [svelte({
    compilerOptions:{
      customElement: true
    }
  })]
})