import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    lib:{
      entry: './src/web-components.ts',
      name: 'ts-components',
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