import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    lib:{
      entry: './src/index.ts',
      name: 'ts-components',
      formats: ['es', 'umd'],
      fileName: (format) => `${format}/ts-components.js`
    },
    rollupOptions: {
      output: {
        dir: "lib",
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