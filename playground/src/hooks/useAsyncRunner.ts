import React, {
  useState,
  useRef,
  useEffect,
  createElement,
  ReactElement,
} from 'react'
import 'construct-style-sheets-polyfill'
import { Runner, UseRunnerProps, UseRunnerReturn } from 'react-runner'
import wasmUrl from '@swc/wasm-web/wasm-web_bg.wasm?url'

import { withFiles } from '../utils/withFiles'
import { useUncaughtError } from './useUncaughtError'

const esmCDN = import.meta.env.VITE_ESM_CDN
const esmCDNQuery = import.meta.env.VITE_ESM_CDN_QUERY
const cssCDN = import.meta.env.VITE_CSS_CDN

const importModuleRegexp = /^import [^'"]* from ['"]([^\.'"\n ][^'"\n ]*)['"]/gm
const importCssRegexp = /^import +['"]([^\.'"\n ][^'"\n ]*\.css)['"]/gm
const remoteRegexp = /^https?:\/\//

const extractImports = (
  code: string,
  ignoredModules: string[] = []
): [string[], string[]] => [
  (code.match(importModuleRegexp) || [])
    .map((x) => x.replace(importModuleRegexp, '$1'))
    .filter((x) => !ignoredModules.includes(x)),
  (code.match(importCssRegexp) || [])
    .map((x) => x.replace(importCssRegexp, '$1'))
    .filter((x) => !ignoredModules.includes(x)),
]

const importCss = (url: string) => {
  try {
    // https://github.com/tc39/proposal-import-assertions
    return eval(`import('${url}', { assert: { type: 'css' }})`)
  } catch {
    return fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error()
        return response.text()
      })
      .then((css) => {
        const style = new CSSStyleSheet()
        return style.replace(css)
      })
      .then((sheet) => ({
        default: sheet,
      }))
      .catch(() => {
        {
          throw new TypeError(
            `Failed to fetch dynamically imported module: ${url}`
          )
        }
      })
  }
}

const interopRequireDefault = (obj: any) => {
  return obj && obj[Symbol.toStringTag] === 'Module'
    ? { ...obj, __esModule: true }
    : obj
}

const normalizeModule = (module: string) => {
  if (remoteRegexp.test(module)) return module
  if (module.endsWith('.css')) return `${cssCDN}${module}`
  return `${esmCDN}${module}${esmCDNQuery}`
}

const normalizeJs = (code: string) => code.replace(importCssRegexp, '')
const normalizeCss = (code: string) => code.replace(/\bbody\b/g, '#root')

const defaultImportsRevolvor = (
  moduleImports: string[],
  cssImports: string[]
): Promise<[Record<string, any>, CSSStyleSheet[]]> => {
  return Promise.all([
    Promise.all(
      moduleImports.map(
        (module) => import(/* @vite-ignore */ normalizeModule(module))
      )
    ).then((result) =>
      Object.fromEntries(
        moduleImports.map((module, idx) => [
          module,
          interopRequireDefault(result[idx]),
        ])
      )
    ),
    Promise.all(
      cssImports.map((module) => importCss(normalizeModule(module)))
    ).then((result) => result.map((x) => x?.default).filter(Boolean)),
  ]).then((result) => result)
}

export type UseAsyncRunnerProps = Omit<UseRunnerProps, 'code'> & {
  files: Record<string, string>
  resolveImports?: (
    moduleImports: string[],
    cssImports: string[]
  ) => Promise<[Record<string, any>, CSSStyleSheet[]]>
}

export type UseAsyncRunnerReturn = UseRunnerReturn & {
  isLoading: boolean
  styleSheets: CSSStyleSheet[]
}

export const useAsyncRunner = ({
  files,
  scope,
  disableCache,
  resolveImports = defaultImportsRevolvor,
}: UseAsyncRunnerProps): UseAsyncRunnerReturn => {
  const elementRef = useRef<ReactElement | null>(null)
  const styleSheetsRef = useRef<CSSStyleSheet[]>([])
  const scopeRef = useRef(scope)
  scopeRef.current = scope

  const [state, setState] = useState<UseAsyncRunnerReturn>({
    isLoading: false,
    element: null,
    styleSheets: [],
    error: null,
  })

  const [readied, setReadied] = useState(false)

  useEffect(() => {
    import('@swc/wasm-web/wasm-web').then((mod) => {
      console.log(wasmUrl)
      mod.default(wasmUrl).then(() => {
        console.log(mod)
        setReadied(true)
      })
    })
  }, [])

  useEffect(() => {
    if (readied) {
      console.log(readied)
      const controller = new AbortController()
      const code = Object.values(files).join('\n\n')
      const trimmedCode = code.trim()
      const extractedImports = extractImports(
        trimmedCode,
        Object.keys(scopeRef.current?.import || {})
      )
      if (extractedImports[0].length || extractedImports[1].length) {
        setState({
          isLoading: true,
          element: disableCache ? null : elementRef.current,
          styleSheets: disableCache ? [] : styleSheetsRef.current,
          error: null,
        })
      }
      resolveImports(...extractedImports)
        .then(([importsMap, styleSheets]) => {
          if (controller.signal.aborted) return

          const code = normalizeJs(files['App.tsx'])
          const jsFiles: Record<string, string> = {}
          const cssFiles: Record<string, string> = {}
          Object.keys(files).forEach((name) => {
            if (name.endsWith('.css'))
              cssFiles[name] = normalizeCss(files[name])
            else if (name !== 'App.tsx')
              jsFiles[name] = normalizeJs(files[name])
          })
          Object.values(cssFiles).forEach((css) => {
            try {
              const style = new CSSStyleSheet()
              style.replaceSync(css)

              styleSheets.push(style)
            } catch {}
          })
          if (controller.signal.aborted) return
          const element = createElement(Runner, {
            code,
            scope: withFiles(
              {
                ...scopeRef.current,
                import: {
                  react: React,
                  ...Object.keys(cssFiles).reduce((acc, name) => {
                    acc[`./${name}`] = undefined
                    return acc
                  }, {} as Record<string, undefined>),
                  ...scopeRef.current?.import,
                  ...importsMap,
                },
              },
              jsFiles
            ),
            onRendered: (error) => {
              if (controller.signal.aborted) return
              if (error) {
                setState({
                  isLoading: false,
                  element: disableCache ? null : elementRef.current,
                  styleSheets: disableCache ? [] : styleSheetsRef.current,
                  error: error.toString(),
                })
              } else {
                elementRef.current = element
                styleSheetsRef.current = styleSheets
              }
            },
          })
          if (controller.signal.aborted) return
          setState({ isLoading: false, element, styleSheets, error: null })
        })
        .catch((error: Error) => {
          setState({
            isLoading: false,
            element: disableCache ? null : elementRef.current,
            styleSheets: disableCache ? [] : styleSheetsRef.current,
            error: error
              .toString()
              .replace(esmCDN, '')
              .replace(esmCDNQuery, ''),
          })
        })

      return () => controller.abort()
    }
  }, [files, disableCache, readied])

  useUncaughtError((error) => {
    setState({
      isLoading: false,
      element: elementRef.current,
      styleSheets: styleSheetsRef.current,
      error: error.replace(esmCDN, '').replace(esmCDNQuery, ''),
    })
  })

  return state
}
