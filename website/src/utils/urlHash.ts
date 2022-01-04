import LZString from 'lz-string'

export const getHashCode = () => {
  if (typeof location === 'undefined') return undefined
  if (location.href.endsWith(location.pathname)) return undefined

  const hash = location.hash.slice(1)
  if (!hash) return ''

  return (
    LZString.decompressFromEncodedURIComponent(hash) || decodeURIComponent(hash)
  )
}

export const updateHash = (code: string) => {
  if (typeof history === 'undefined') return

  const hash = code ? LZString.compressToEncodedURIComponent(code) : ''
  history.replaceState(history.state, '', `#${hash}`)
}
