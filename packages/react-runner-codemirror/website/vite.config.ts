import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      sucrase: 'sucrase/dist/index.js',
    },
  },
  plugins: [react()],
})
