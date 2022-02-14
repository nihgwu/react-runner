import React, { useState, useMemo } from 'react'
import { Runner, importCode, Scope } from 'react-runner'
import { ShadowRoot } from './ShadowRoot'

const withFiles = (scope: Scope, files: Record<string, string>) => {
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
    },
    get(target, prop: string) {
      if (prop in target) return target[prop]
      if (files.hasOwnProperty(prop)) {
        if (lookup.has(prop)) {
          throw new Error(
            `Circular dependency detected: ${[...lookup, prop].join(' -> ')}`
          )
        }
        lookup.add(prop)
        return (target[prop] = importCode(files[prop], {
          ...scope,
          import: importsProxy,
        }))
      }
    },
  })

  Object.keys(files).forEach((file) => {
    try {
      imports[file] = importsProxy[file]
      lookup.clear()
    } catch (error: any) {
      error.name = file
      throw error
    }
  })

  return { ...scope, import: imports }
}

const baseScope = {
  import: {
    react: React,
  },
}

export const LiveRunner = ({
  files,
}: {
  files: Array<{ name: string; content: string }>
}) => {
  const [importsError, setImportsError] = useState<string | null>(null)
  const [renderError, setRenderError] = useState<string | null>(null)

  const scope = useMemo(() => {
    try {
      const scope = withFiles(
        baseScope,
        files.slice(1).reduce((acc, item) => {
          if (item.name.endsWith('.css')) return acc
          acc[`./${item.name}`] = item.content
          return acc
        }, {} as Record<string, string>)
      )
      if (importsError) setImportsError(null)
      return scope
    } catch (error: any) {
      setImportsError(
        `${error.name ? `[${error.name}] ` : ''}${error.toString()}`
      )
    }
  }, [files, importsError])

  return (
    <div className="Preview">
      {importsError ? (
        <pre className="Preview-error">{importsError}</pre>
      ) : (
        <ShadowRoot>
          <Runner
            code={files[0].content}
            scope={scope}
            onRendered={(error) => {
              if (error) {
                setRenderError(error.toString())
              } else if (renderError) {
                setRenderError(null)
              }
            }}
          />
          {files.map(
            (file) =>
              file.name.endsWith('.css') && (
                <style key={file.name}>{file.content}</style>
              )
          )}
        </ShadowRoot>
      )}
      {renderError && <pre className="Preview-error">{renderError}</pre>}
    </div>
  )
}
