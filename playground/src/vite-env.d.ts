/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ESM_CDN: string
  readonly VITE_ESM_CDN_QUERY: string
  readonly VITE_CSS_CDN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
