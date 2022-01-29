import React, {
  createElement,
  isValidElement,
  Fragment,
  ReactElement,
} from 'react'

import { transform } from './transform'
import { RunnerOptions, Scope } from './types'

const elementRegexp = /^<[^>]*>/
const componentRegexp = /^(function|\(\)|class)[^\w]+/

const normalizeCode = (code: string) => {
  const trimmedCode = code.trim()

  if (!trimmedCode) return trimmedCode
  // inline elements
  if (elementRegexp.test(trimmedCode)) {
    return `export default <>${trimmedCode}</>`
  }
  // inline component or fallback if there is no default export
  if (componentRegexp.test(trimmedCode)) {
    return `export default ${trimmedCode}`
  }
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

export const generateElement = (
  options: RunnerOptions
): ReactElement | null => {
  const { code, scope } = options

  const normalizedCode = normalizeCode(code)
  if (!normalizedCode) return null

  const transformedCode = transform(normalizedCode)
  const exports: Scope = {}
  const render = (value: unknown) => {
    exports.default = value
  }
  evalCode(transformedCode, { render, ...baseScope, ...scope, exports })

  const result = exports.default
  if (!result) return null
  if (isValidElement(result)) return result
  if (typeof result === 'function') return createElement(result)
  if (typeof result === 'string') {
    return createElement(Fragment, undefined, result)
  }
  return null
}

export const createRequire = (imports: Scope) => (module: string) => {
  if (!imports.hasOwnProperty(module)) {
    throw new Error(`Module not found: '${module}'`)
  }
  return imports[module]
}

export const importCode = (code: string, scope?: Scope) => {
  const exports: Scope = {}
  evalCode(transform(code), { ...baseScope, ...scope, exports })

  return exports
}
