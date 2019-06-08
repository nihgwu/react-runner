import React from 'react'
import { transform } from 'sucrase'

const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = Object.values(scope)
  // eslint-disable-next-line no-new-func
  const fn = new Function(...scopeKeys, code)
  return fn(...scopeValues)
}

const prepareCode = code => {
  const exportRegexp = /\bexport default\b/gm
  const renderRegexp = /\brender(\([^)])/gm
  const elementRegexp = /^<.+>/g

  // export default Component
  if (exportRegexp.test(code)) return code.replace(exportRegexp, 'return')
  // render(<Component />)
  if (renderRegexp.test(code)) return code.replace(renderRegexp, 'return $1')
  // remove trailing comma for expression
  code = code.replace(/;$/, '')
  // inline elements
  if (elementRegexp.test(code) && React.Fragment) code = `<>${code}</>`
  return `return (${code})`
}

const errorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends React.Component {
    state = {
      error: null,
    }

    componentDidCatch(error) {
      this.setState({ error })
      errorCallback(error)
    }

    render() {
      if (this.state.error) return null
      return typeof Element === 'function' ? <Element /> : Element
    }
  }
}

export const generateElement = (
  { code, scope, type },
  errorCallback = () => {}
) => {
  try {
    const trimmedCode = code ? code.trim() : ''
    if (!trimmedCode) return null

    const transformedCode = transform(prepareCode(trimmedCode), {
      transforms: [
        'jsx',
        'imports',
        type === 'typescript' && 'typescript',
        type === 'flow' && 'flow',
      ].filter(Boolean),
      production: true,
    }).code.substr(13)
    const Element = errorBoundary(
      evalCode(transformedCode, { React, ...scope }),
      errorCallback
    )
    return <Element />
  } catch (error) {
    // run after return
    setTimeout(errorCallback, 0, error)
    return null
  }
}
