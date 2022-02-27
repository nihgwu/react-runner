import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // vite 2.8 will throw error `TypeError: import_NameManager.default is not a constructor`
      // as it will try to import `.js` file instead of `.mjs` from `index.mjs`
      sucrase: 'sucrase/dist/index.js',
    },
  },
  plugins: [react()],
})
