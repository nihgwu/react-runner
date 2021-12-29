import React, {
  createElement,
  isValidElement,
  Fragment,
  ReactElement,
  ReactNode,
} from 'react'

import { ErrorBoundary } from './ErrorBoundary'
import { transform } from './transform'
import { RunnerOptions, RunnerResult, ErrorCallback, Scope } from './types'

const exportRegexp = /^export default(?=\s+)/m
const renderRegexp = /^render(?=\s*\([^)])/m
const elementRegexp = /^</

const prepareCode = (code: string) => {
  // export default Component
  if (exportRegexp.test(code)) return code.replace(exportRegexp, 'return')
  // render(<Component />)
  if (renderRegexp.test(code)) return code.replace(renderRegexp, 'return')
  // remove trailing comma for expression
  code = code.replace(/;$/, '')
  // inline elements
  if (elementRegexp.test(code) && Fragment) code = `<>${code}</>`
  return `return (${code})`
}

const evalCode = (code: string, scope: Scope) => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map((key) => scope[key])
  // eslint-disable-next-line no-new-func
  const fn = new Function(...scopeKeys, code)
  return fn(...scopeValues)
}

const generateElement = (
  options: RunnerOptions,
  onError?: ErrorCallback
): ReactElement | null => {
  const { code, scope } = options
  const trimmedCode = code ? code.trim() : ''
  if (!trimmedCode) return null

  const transformedCode = transform(prepareCode(trimmedCode))
  const result = evalCode(transformedCode, { React, ...scope })

  let children: ReactNode
  if (isValidElement(result)) children = result
  // prevent crashing with code `console`
  else if (typeof result === 'object') children = String(result)
  else if (typeof result === 'function') children = createElement(result)
  else children = null

  return createElement(ErrorBoundary, { onError }, children)
}

export const compile = (options: RunnerOptions, onError?: ErrorCallback) => {
  let state: RunnerResult
  try {
    state = {
      element: generateElement(options, onError),
      error: null,
    }
  } catch (error: unknown) {
    state = {
      element: null,
      error: (error as Error).toString(),
    }
  }

  return state
}
