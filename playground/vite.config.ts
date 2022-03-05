import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    'process.env': {},
  },
  plugins: [
    react({
      jsxRuntime: command === 'serve' ? 'classic' : 'automatic',
    }),
  ],
  resolve: {
    alias: {
      react: 'https://esm.sh/react',
      'react-dom': 'https://esm.sh/react-dom',
      sucrase: 'sucrase/dist/index.js',
    },
  },
  css: {
    postcss: {
      plugins: [require('postcss-nesting')],
    },
  },
}))
