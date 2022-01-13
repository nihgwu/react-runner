import React, {
  createElement,
  isValidElement,
  Fragment,
  ReactElement,
} from 'react'

import { transform } from './transform'
import { RunnerOptions, Scope } from './types'

const exportRegexp = /^export default(?=\s+)/m
const renderRegexp = /^render(?=\s*\([^)])/m
const elementRegexp = /^<[^>]*>/
const componentRegexp = /^(function|\(\)|class)[^\w]+/

const prepareCode = (code: string) => {
  // inline elements
  if (elementRegexp.test(code)) return `return (<>${code}</>)`
  // export default Component
  if (exportRegexp.test(code)) return code.replace(exportRegexp, 'return')
  // render(<Component />)
  if (renderRegexp.test(code)) return code.replace(renderRegexp, 'return')
  // inline component
  // remove trailing comma for expression
  if (componentRegexp.test(code)) return `return (${code.replace(/;$/, '')})`
  return code
}

const evalCode = (code: string, scope: Scope) => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map((key) => scope[key])
  // eslint-disable-next-line no-new-func
  const fn = new Function(...scopeKeys, code)
  return fn(...scopeValues)
}

const baseScope = {
  React,
  jsxPragma: React.createElement,
  jsxFragmentPragma: React.Fragment,
}

export const createRequire = (imports: Scope) => (module: string) => {
  if (!imports.hasOwnProperty(module)) {
    throw new Error(`Module not found: '${module}'`)
  }
  return imports[module]
}

export const generateElement = (
  options: RunnerOptions
): ReactElement | null => {
  const { code, scope } = options
  const trimmedCode = code.trim()
  if (!trimmedCode) return null

  const transformImports = scope?.require && typeof scope.require === 'function'
  const transformedCode = transform(prepareCode(trimmedCode), transformImports)
  const result = evalCode(transformedCode, { ...baseScope, ...scope })

  if (!result) return null
  if (isValidElement(result)) return result
  if (typeof result === 'function') return createElement(result)
  if (typeof result === 'string') {
    return createElement(Fragment, undefined, result)
  }
  return null
}
