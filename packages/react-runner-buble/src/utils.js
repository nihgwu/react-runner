import React from 'react'
import { transform } from 'buble'

const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])
  // eslint-disable-next-line no-new-func
  const fn = new Function(...scopeKeys, code)
  return fn(...scopeValues)
}

const prepareCode = code => {
  const exportRegexp = /\bexport default( +[\S]+)/gm
  const renderRegexp = /\brender\s*(\([^)])/gm
  const elementRegexp = /^<.+>/gm

  // export default Component
  if (exportRegexp.test(code)) return code.replace(exportRegexp, 'return $1')
  // render(<Component />)
  if (renderRegexp.test(code)) return code.replace(renderRegexp, 'return $1')
  // remove trailing comma for expression
  code = code.replace(/;$/, '')
  // inline elements
  if (elementRegexp.test(code) && React.Fragment) code = `<>${code}</>`
  return `return (${code})`
}

const withErrorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends React.Component {
    state = {
      error: null,
    }

    componentDidCatch(error) {
      this.setState({ error })
      errorCallback(error.toString())
    }

    render() {
      if (this.state.error) return null
      return typeof Element === 'function' ? <Element /> : Element
    }
  }
}

export const generateElement = (options, errorCallback = () => {}) => {
  const { code, scope } = options
  const trimmedCode = code ? code.trim() : ''
  if (!trimmedCode) return null

  const transformedCode = transform(prepareCode(trimmedCode), {
    transforms: {
      dangerousForOf: true,
      dangerousTaggedTemplateString: true,
    },
  }).code
  const result = evalCode(transformedCode, { React, ...scope })
  const Element = withErrorBoundary(result, errorCallback)

  return <Element />
}

export const compile = (options, errorCallback) => {
  let element = null
  let error = null
  try {
    element = generateElement(options, errorCallback)
  } catch (err) {
    error = err.toString()
  }

  return { element, error }
}
