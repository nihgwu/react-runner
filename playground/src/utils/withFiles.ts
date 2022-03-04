import { importCode, Scope } from 'react-runner'

import { splitFileName } from './filename'

export const withFiles = (
  scope: Scope,
  filesMap: Record<string, string>,
  entry?: string
) => {
  const files: Record<string, string> = Object.fromEntries(
    Object.entries(filesMap)
      .map(([key, value]) => {
        const [name, ext] = splitFileName(key)
        if (!['js', 'jsx', 'ts', 'tsx'].includes(ext)) return []
        return [
          [`./${key}`, value],
          [`./${name}`, value],
        ]
      })
      .flat()
  )
  const imports: Scope = { ...scope.import }
  const lookup = new Set<string>()

  const importsProxy: Scope = new Proxy(imports, {
    getOwnPropertyDescriptor(target, prop) {
      if (target.hasOwnProperty(prop)) {
        return Object.getOwnPropertyDescriptor(target, prop)
      }
      if (files.hasOwnProperty(prop)) {
        return { writable: true, enumerable: true, configurable: true }
      }
      return undefined
    },
    get(target, prop: string) {
      if (prop in target) return target[prop]
      if (files.hasOwnProperty(prop)) {
        if (lookup.has(prop)) {
          throw new Error(
            `Circular dependency detected: ${[...Array.from(lookup), prop].join(
              ' -> '
            )}`
          )
        }
        lookup.add(prop)
        try {
          return (target[prop] = importCode(files[prop], {
            ...scope,
            render: () => {},
            import: importsProxy,
          }))
        } catch (error: any) {
          const name = Object.keys(filesMap).find(
            (x) => `./${splitFileName(x)[0]}` === splitFileName(prop)[0]
          )
          if (!error.name?.startsWith('.')) error.name = `./${name}`
          throw error
        }
      }
    },
  })

  if (entry) {
    importsProxy[`./${entry}`]
  } else {
    Object.keys(files).forEach((file) => {
      imports[file] = importsProxy[file]
      lookup.clear()
    })
  }

  return { ...scope, import: imports }
}
