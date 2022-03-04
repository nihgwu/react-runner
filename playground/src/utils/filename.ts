// filename = '../foo/bar.js'
export const splitFileName = (filename: string) => {
  const baseIdx = filename.lastIndexOf('/')
  const idx = filename.lastIndexOf('.')
  if (idx <= baseIdx) return [filename, '']
  return [filename.substring(0, idx), filename.substring(idx + 1)]
}

export const isJsFile = (filename: string) => {
  const [_, ext] = splitFileName(filename)
  return ['js', 'jsx', 'ts', 'tsx'].includes(ext)
}
