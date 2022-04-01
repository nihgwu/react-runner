import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'

config()
const esmCDN = process.env.VITE_ESM_CDN
const esmCDNQuery = process.env.VITE_ESM_CDN_QUERY

// https://vitejs.dev/config/
export default defineConfig({
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
      react: `${esmCDN}react${esmCDNQuery}`,
      'react-dom': `${esmCDN}react-dom${esmCDNQuery}`,
    },
  },
  css: {
    postcss: {
      plugins: [require('postcss-nesting')],
    },
  },
})
