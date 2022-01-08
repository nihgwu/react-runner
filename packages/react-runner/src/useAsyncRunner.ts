import { useState, useRef, useEffect, createElement, ReactElement } from 'react'

import { Runner } from './Runner'
import { UseRunnerProps, UseRunnerReturn } from './useRunner'

export type ImportsMap = Record<string, any>

const importRegexp = /^import [^']* from '([^']+)'/gm

const extractImports = (code: string) =>
  (code.match(importRegexp) || []).map((x) => x.replace(importRegexp, '$1'))

function interopRequireDefault(obj: any) {
  return obj && obj[Symbol.toStringTag] === 'Module'
    ? { ...obj, __esModule: true }
    : obj
}

const defaultImportsRevolvor = (imports: string[]) => {
  return Promise.all(
    imports.map((module) => eval(`import('https://cdn.skypack.dev/${module}')`))
  ).then((result) =>
    Object.fromEntries(
      imports.map((module, idx) => [module, interopRequireDefault(result[idx])])
    )
  )
}

export type UseAsyncRunnerProps = UseRunnerProps & {
  resolveImports?: (imports: string[]) => Promise<ImportsMap>
}

export const useAsyncRunner = ({
  code,
  scope,
  disableCache,
  resolveImports = defaultImportsRevolvor,
}: UseAsyncRunnerProps): UseRunnerReturn => {
  const elementRef = useRef<ReactElement | null>(null)
  const scopeRef = useRef(scope)
  scopeRef.current = scope

  const [state, setState] = useState<UseRunnerReturn>({
    element: null,
    error: null,
  })

  useEffect(() => {
    resolveImports(extractImports(code)).then((importsMap) => {
      const element = createElement(Runner, {
        code,
        scope: {
          ...scopeRef.current,
          require: (module: string) => importsMap[module],
        },
        onRendered: (error) => {
          if (error) {
            setState({
              element: disableCache ? null : elementRef.current,
              error,
            })
          } else {
            elementRef.current = element
          }
        },
      })
      setState({ element, error: null })
    })
  }, [code, disableCache])

  return state
}
