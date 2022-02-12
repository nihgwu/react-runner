import React, { createElement, isValidElement, ReactElement } from 'react'

import { transform } from './transform'
import { RunnerOptions, Scope } from './types'

const elementRegexp = /^<[^>]*>/
const componentRegexp = /^(function|\(\)|class)[^\w]+/

const normalizeCode = (code: string) => {
  const trimmedCode = code.trim()
  if (!trimmedCode) return trimmedCode
  // inline element/component or fallback if there is no default export
  if (elementRegexp.test(trimmedCode) || componentRegexp.test(trimmedCode)) {
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

export const generateElement = (
  options: RunnerOptions
): ReactElement | null => {
  const { code, scope, imports } = options

  const normalizedCode = normalizeCode(code)
  if (!normalizedCode) return null

  const exports: Scope = {}
  const render = (value: unknown) => {
    exports.default = value
  }
  evalCode(transform(normalizedCode), {
    React,
    render,
    require: createRequire(imports),
    ...scope,
    exports,
  })

  const result = exports.default
  if (!result) return null
  if (isValidElement(result)) return result
  if (typeof result === 'function') return createElement(result)
  if (typeof result === 'string') {
    return result as unknown as ReactElement
  }
  return null
}

export const createRequire =
  (imports: Scope = {}) =>
  (module: string): Scope => {
    if (!imports.hasOwnProperty(module)) {
      throw new Error(`Module not found: '${module}'`)
    }
    return imports[module]
  }

export const importCode = ({ code, scope, imports }: RunnerOptions) => {
  const exports: Scope = {}
  evalCode(transform(code), {
    React,
    require: createRequire(imports),
    ...scope,
    exports,
  })

  return exports
}
