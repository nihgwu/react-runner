import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'

config()
const esmCDN = process.env.VITE_ESM_CDN
const esmCDNQuery = process.env.VITE_ESM_CDN_QUERY

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
      react: `${esmCDN}react${esmCDNQuery}`,
      'react/jsx-runtime': `${esmCDN}react/jsx-runtime${esmCDNQuery}`,
      'react-dom': `${esmCDN}react-dom${esmCDNQuery}`,
      sucrase: 'sucrase/dist/index.js',
    },
  },
  css: {
    postcss: {
      plugins: [require('postcss-nesting')],
    },
  },
}))
