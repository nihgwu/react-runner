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
const elementRegexp = /^</

const prepareCode = (code: string) => {
  // export default Component
  if (exportRegexp.test(code)) return code.replace(exportRegexp, 'return')
  // render(<Component />)
  if (renderRegexp.test(code)) return code.replace(renderRegexp, 'return')
  // remove trailing comma for expression
  code = code.replace(/;$/, '')
  // inline elements
  if (elementRegexp.test(code)) code = `<>${code}</>`
  return `return (${code})`
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
  const trimmedCode = code.trim()
  if (!trimmedCode) return null

  const hasImports = !!imports && Object.keys(imports).length > 0
  const transformedCode = transform(prepareCode(trimmedCode), hasImports)
  const evalScope: Scope = { React, ...scope }
  if (hasImports) {
    evalScope.require = (module: string) => {
      if (!imports.hasOwnProperty(module)) {
        throw new Error(`Module not found: '${module}'`)
      }
      return imports[module]
    }
  }

  const result = evalCode(transformedCode, evalScope)

  if (!result) return null
  if (isValidElement(result)) return result
  if (typeof result === 'function') return createElement(result)
  if (typeof result === 'string') {
    return createElement(Fragment, undefined, result)
  }
  return null
}
