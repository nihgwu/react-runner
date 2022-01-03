import LZString from 'lz-string'

export const getCode = (defaultValue = '') => {
  if (typeof document === 'undefined') return defaultValue

  const hash = document.location.hash.slice(1)
  if (!hash) return defaultValue

  return (
    LZString.decompressFromEncodedURIComponent(hash) || decodeURIComponent(hash)
  )
}

export const replaceState = (code: string) => {
  if (typeof document === 'undefined') return

  const url = new URL(document.location.href)
  url.hash = code ? LZString.compressToEncodedURIComponent(code) : ''
  window.history.replaceState(null, '', url)
}
