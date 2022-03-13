import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'

config()
const esmCDN = process.env.VITE_ESM_CDN

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
      react: `${esmCDN}react`,
      'react-dom': `${esmCDN}react-dom`,
      sucrase: 'sucrase/dist/index.js',
    },
  },
  css: {
    postcss: {
      plugins: [require('postcss-nesting')],
    },
  },
}))
