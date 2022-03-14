import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'

config()
const esmCDN = process.env.VITE_ESM_CDN

// https://vitejs.dev/config/
export default defineConfig(() => ({
  define: {
    'process.env': {},
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  resolve: {
    alias: {
      react: `${esmCDN}react?pin=v68`,
      'react-dom': `${esmCDN}react-dom?pin=v68`,
      sucrase: 'sucrase/dist/index.js',
    },
  },
  css: {
    postcss: {
      plugins: [require('postcss-nesting')],
    },
  },
}))
