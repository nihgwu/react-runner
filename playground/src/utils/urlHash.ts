import LZString from 'lz-string'

export const decodeHash = (hash: string): Record<string, string> => {
  const str = LZString.decompressFromEncodedURIComponent(hash) || ''
  if (str.startsWith('{"App.tsx":"')) {
    try {
      return JSON.parse(str)
    } catch {
      return { 'App.tsx': str }
    }
  }
  return { 'App.tsx': str }
}

const emptyFiles = { 'App.tsx': '' }

export const getHashFiles = () => {
  if (typeof location === 'undefined') return emptyFiles
  if (location.href.endsWith(location.pathname)) return emptyFiles

  const hash = location.hash.slice(1)
  if (!hash) return emptyFiles

  return decodeHash(hash)
}

export const getHash = () => {
  if (typeof location === 'undefined') return undefined
  if (location.href.endsWith(location.pathname)) return undefined

  const hash = location.hash.slice(1)
  if (!hash) return ''
  return hash
}

export const updateHash = (files: Record<string, string>) => {
  if (typeof history === 'undefined') return

  const str =
    Object.keys(files).length === 1 ? files['App.tsx'] : JSON.stringify(files)
  const hash = str ? LZString.compressToEncodedURIComponent(str) : ''
  history.replaceState(history.state, '', `#${hash}`)
}
